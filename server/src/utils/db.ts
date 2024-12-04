import { PrismaClient } from '@prisma/client';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export async function initializePrisma(): Promise<PrismaClient | null> {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempting database connection (attempt ${attempt}/${MAX_RETRIES})...`);
      await prisma.$connect();
      console.log('Database connection established successfully');
      return prisma;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        throw new Error('Failed to connect to database after multiple attempts');
      }
      
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  
  return null;
} 