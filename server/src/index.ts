import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
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
    // Use RAILWAY_PUBLIC_DATABASE_URL if available
    if (process.env.RAILWAY_PUBLIC_DATABASE_URL) {
      console.log('Using RAILWAY_PUBLIC_DATABASE_URL');
      return process.env.RAILWAY_PUBLIC_DATABASE_URL;
    }
    
    // Fall back to transforming DATABASE_URL if needed
    if (process.env.DATABASE_URL) {
      const publicUrl = process.env.DATABASE_URL.replace(
        'postgresql.railway.internal',
        process.env.RAILWAY_STATIC_URL || 'railway.app'
      );
      console.log('Using transformed DATABASE_URL for Railway');
      return publicUrl;
    }
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
      // Only log the host part of the URL for security
      const sanitizedUrl = dbUrl.replace(/:[^:@]+@/, ':****@');
      console.log('Using database URL:', sanitizedUrl);
      await prisma.$connect();
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