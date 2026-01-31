import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient({
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    throw error;
  }
}

export { prisma, connectDB };