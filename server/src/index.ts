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

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
    app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Welcome to CloudNotes API' });
    });

    // Health check route
    app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok' });
    });
    
    // API routes
    app.use('/api/health', healthRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/notes', notesRouter);
    app.use('/api/folders', foldersRouter);
    app.use('/api/admin', adminRouter);
    
    // Error handling middleware
    app.use((err: any, req: Request, res: Response, next: any) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });
    
    // Handle 404
    app.use((req: Request, res: Response) => {
      res.status(404).json({ error: 'Not Found' });
    });
    
    // Start server
    server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      console.log('CORS enabled for origins:', corsOptions.origin);
    });

    // Initialize Socket.IO
    const io = new SocketServer(server, {
      cors: corsOptions
    });

    // Socket.IO connection handling
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
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