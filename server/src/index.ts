import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient, Prisma } from '@prisma/client';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

const app = express();
const httpServer = createServer(app);

// Get database URL based on environment
const getDatabaseUrl = () => {
  if (process.env.RAILWAY_ENVIRONMENT === 'production') {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not configured');
    }

    // Handle different Railway database URL formats
    if (dbUrl.includes('postgresql.railway.internal')) {
      const publicUrl = dbUrl.replace(
        'postgresql.railway.internal',
        'railway.app'
      );
      console.log('Using transformed Railway DATABASE_URL');
      return publicUrl;
    }
    
    console.log('Using original DATABASE_URL');
    return dbUrl;
  }
  
  console.log('Using default DATABASE_URL');
  return process.env.DATABASE_URL;
};

// Initialize Prisma with connection retry logic
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  }
});

// Prisma error handling middleware
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Database error:', error.message);
      // Attempt to reconnect
      await prisma.$connect();
    }
    throw error;
  }
});

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Test database connection with retries
async function testDbConnection(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting database connection (attempt ${i + 1}/${retries})...`);
      const dbUrl = getDatabaseUrl();
      if (!dbUrl) {
        throw new Error('Database URL is not configured');
      }
      
      // Test the connection with a simple query
      await prisma.$executeRaw`SELECT 1`;
      
      // Set up connection error handler
      prisma.$on('beforeExit', async () => {
        console.log('Prisma Client is shutting down');
        try {
          await prisma.$disconnect();
          console.log('Disconnected from database');
        } catch (disconnectError) {
          console.error('Failed to disconnect:', disconnectError);
        }
      });

      // Handle process termination
      process.on('SIGINT', async () => {
        console.log('Received SIGINT signal');
        try {
          await prisma.$disconnect();
          console.log('Disconnected from database');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      console.log('Successfully connected to database');
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.json({
    message: 'CloudNotes API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint with DB check
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
      databaseUrl: getDatabaseUrl()?.split('@')[1] // Only show host part for security
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

// Initialize server
async function startServer() {
  try {
    const dbConnected = await testDbConnection();
    if (!dbConnected) {
      throw new Error('Failed to connect to database after multiple retries');
    }
    
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log('Database connection successful');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and database connection...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer(); 