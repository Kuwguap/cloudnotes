import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { initializePrisma } from './utils/db';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import notesRouter from './routes/notes';
import foldersRouter from './routes/folders';
import adminRouter from './routes/admin';

const app: Express = express();
const port: number = Number(process.env.PORT) || 5000;

const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000'];

// Set up CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers middleware
app.use((req: Request, res: Response, next): void => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

async function startServer() {
  let prisma: PrismaClient | null = null;
  let server: Server | null = null;

  try {
    // Initialize database connection with retry logic
    prisma = await initializePrisma();
    if (!prisma) throw new Error('Failed to initialize Prisma client');
    
    // Root route
    app.get('/', (_req: Request, res: Response): void => {
      res.json({ message: 'Welcome to CloudNotes API' });
    });

    // Health check route
    app.get('/health', (_req: Request, res: Response): void => {
      res.json({ status: 'ok' });
    });
    
    // API routes
    app.use('/api/health', healthRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/notes', notesRouter);
    app.use('/api/folders', foldersRouter);
    app.use('/api/admin', adminRouter);
    
    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: any): void => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });
    
    // Handle 404
    app.use((_req: Request, res: Response): void => {
      res.status(404).json({ error: 'Not Found' });
    });
    
    // Start server
    server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      console.log('CORS enabled for origins:', corsOrigins);
    });

    // Initialize Socket.IO
    const io = new SocketServer(server, {
      cors: {
        origin: (origin, callback) => {
          if (!origin || corsOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      },
      transports: ['websocket'],
      path: '/socket.io',
      pingTimeout: 60000,
      pingInterval: 25000
    });

    // Socket.IO connection handling
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socket.on('disconnect', (reason) => {
        console.log('Client disconnected:', socket.id, reason);
      });
    });
    
    // Handle shutdown gracefully
    const shutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down gracefully...`);

      if (server) {
        server.close(async () => {
          console.log('HTTP server closed');
          if (prisma) {
            await prisma.$disconnect();
            console.log('Database connection closed');
          }
          process.exit(0);
        });

        // Force shutdown after 30 seconds
        setTimeout(() => {
          console.error('Could not close connections in time, forcefully shutting down');
          process.exit(1);
        }, 30000);
      }
    };
    
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
  } catch (error) {
    console.error('Failed to start server:', error);
    if (prisma) await prisma.$disconnect();
    if (server) server.close();
    process.exit(1);
  }
}

startServer(); 