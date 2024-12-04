import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient, Prisma } from '@prisma/client';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

// Initialize Prisma client at the top level
let prisma: PrismaClient;

const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

const app = express();
const httpServer = createServer(app);

// Get database URL based on environment
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:zxwAfCZRIoHudLtdKzijtBJueMQtLfYq@autorack.proxy.rlwy.net:54425/railway';
  
  if (!dbUrl) {
    throw new Error(
      'DATABASE_URL is not configured. Please set it in your .env file.\n' +
      'Example: DATABASE_URL="postgresql://user:password@localhost:5432/cloudnotes?schema=public"'
    );
  }

  console.log('Using Railway DATABASE_URL');
  return dbUrl;
};

// Initialize Prisma with connection retry logic
const initializePrisma = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting database connection (attempt ${attempt}/${maxRetries})...`);
      
      prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        datasources: {
          db: {
            url: getDatabaseUrl()
          }
        }
      });

      // Test the connection
      await prisma.$connect();
      await prisma.$executeRaw`SELECT 1`;
      
      console.log('Successfully connected to database');
      return prisma;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw new Error('Failed to connect to database after multiple attempts');
      }
      
      console.log(`Retrying in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  throw new Error('Failed to initialize database connection');
};

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Define port
const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      database: 'disconnected',
      timestamp: new Date().toISOString()
    });
  }
});

// Start the server
const startServer = async () => {
  try {
    await initializePrisma();
    
    // Set up routes and middleware after database is connected
    app.use(cors({
      origin: corsOrigins,
      credentials: true
    }));
    app.use(express.json());
    app.use('/api', routes);
    app.use(errorHandler);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and database connection...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing HTTP server and database connection...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer(); 