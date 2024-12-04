import { PrismaClient } from '@prisma/client';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export async function initializePrisma(): Promise<PrismaClient | null> {
  console.log('Initializing database connection...');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//[CREDENTIALS_HIDDEN]@')); 
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    log: ['query', 'info', 'warn', 'error'],
  });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempting database connection (attempt ${attempt}/${MAX_RETRIES})...`);
      await prisma.$connect();
      console.log('Database connection established successfully');
      return prisma;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      if (attempt === MAX_RETRIES) {
        throw new Error('Failed to connect to database after multiple attempts');
      }
      
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  
  return null;
} 