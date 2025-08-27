// Import dotenv to load environment variables from .env file
import dotenv from 'dotenv';
// Load environment variables from the parent directory's .env file
dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

// Import the PrismaClient to interact with the database
import { PrismaClient } from './src/generated/prisma';

// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Import sample data for seeding
import {
  users,
  customers,
  revenue,
  invoices,
} from './src/lib/placeholder_data.js';

// Initialize the Prisma client
const prisma = new PrismaClient();

// Function to seed user data
async function seedUsers() {
  for (const user of users) {
    // Hash the user's password before storing
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Use upsert to insert user if it doesn't exist or update if it does
    await prisma.user.upsert({
      where: { email: user.email }, 
      update: {},                   
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,  
        avatar: user.Avatar || '' 
      },
    });
  }
  console.log(`Seeded ${users.length} users`);
}

// Function to seed customer data
async function seedCustomers() {
  for (const customer of customers) {
    // Use upsert to avoid duplicates based on email
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: {},
      create: customer,
    });
  }
  console.log(`Seeded ${customers.length} customers`);
}

// Function to seed revenue data
async function seedRevenue() {
  for (const rev of revenue) {
    // Upsert revenue by month to prevent duplicates
    await prisma.revenue.upsert({
      where: { month: rev.month }, // Assume month is unique
      update: {},
      create: rev,
    });
  }
  console.log(`Seeded ${revenue.length} revenue records`);
}

// Function to seed invoice data
async function seedInvoices() {
  for (const invoice of invoices) {
    // Create invoices without upsert (assuming no unique constraint needed)
    await prisma.invoice.create({
      data: invoice,
    });
  }
  console.log(`Seeded ${invoices.length} invoices`);
}

async function main() {
  console.log('🌱 Starting full database seed...');

  await seedUsers();    
  await seedCustomers();
  await seedInvoices(); 
  await seedRevenue();  
}

// Run the main function and handle errors
main()
  .catch((e) => {
    // Log errors
    console.error('Seed failed:', e);
    process.exit(1);                    
  })
  //disconnect the DB
  .finally(async () => {
    await prisma.$disconnect();  
    console.log('🌾 Seed complete and DB disconnected.');
  });
