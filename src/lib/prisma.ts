// Import the PrismaClient class from the generated @prisma/client package
import { PrismaClient } from '@prisma/client'

// Extend the global object to store the Prisma client instance
// This prevents multiple instances during development (due to hot reloads)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a new Prisma client or reuse an existing one (in dev)
export const prisma =
  globalForPrisma.prisma ?? // If already created, reuse it
  new PrismaClient({
    log: ['query'], // Optional: Log all queries to the console (for debugging)
  })

// In development, store the Prisma client in the global object
// to avoid creating multiple instances during hot reloads
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
