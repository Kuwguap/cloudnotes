import express from 'express';
import { initializePrisma } from './utils/db';
import healthRouter from './routes/health';

const app = express();
const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    // Initialize database connection
    const prisma = await initializePrisma();
    if (!prisma) throw new Error('Failed to initialize Prisma client');
    
    // Add routes
    app.use(healthRouter);
    
    // Start server
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
    
    // Handle shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Closing database connection...');
      await prisma.$disconnect();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 