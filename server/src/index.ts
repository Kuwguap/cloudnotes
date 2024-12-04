import express, { Express } from 'express';
import { Server } from 'http';
import { PrismaClient } from '@prisma/client';
import { initializePrisma } from './utils/db';
import healthRouter from './routes/health';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

async function startServer() {
  let prisma: PrismaClient | null = null;
  let server: Server | null = null;

  try {
    // Initialize database connection with retry logic
    prisma = await initializePrisma();
    if (!prisma) throw new Error('Failed to initialize Prisma client');
    
    // Add routes
    app.use(healthRouter);
    
    // Start server
    server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
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