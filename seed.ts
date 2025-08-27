import dotenv from 'dotenv';
import { PrismaClient } from './src/generated/prisma';
import bcrypt from 'bcrypt';
import {
  users,
  customers,
  revenue,
  invoices,
} from './src/lib/placeholder_data.js';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

const prisma = new PrismaClient();

async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
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
async function seedCustomers() {
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: {},
      create: customer,
    });
  }
  console.log(`Seeded ${customers.length} customers`);
}


async function seedRevenue() {
  for (const rev of revenue) {
    
    await prisma.revenue.upsert({
      where: { month: rev.month }, 
      update: {},
      create: rev,
    });
  }
  console.log(`Seeded ${revenue.length} revenue records`);
}

async function seedInvoices() {
  for (const invoice of invoices) {
    
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


main()
  .catch((e) => {
    
    console.error('Seed failed:', e);
    process.exit(1);                    
  })
  
  .finally(async () => {
    await prisma.$disconnect();  
    console.log('🌾 Seed complete and DB disconnected.');
  });
