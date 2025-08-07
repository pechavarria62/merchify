// Import the Prisma client from your shared library
import { prisma } from '@/lib/prisma';

// Import bcrypt to hash passwords securely
import bcrypt from 'bcrypt';

// Define the POST handler for the API route
export async function POST(req: Request) {
  // Parse the JSON body of the incoming request
  const body = await req.json();
  const { username, email, password } = body;

  // Hash the plain-text password using bcrypt with a salt round of 10
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database using Prisma
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword, // Store the hashed password, not plain text
    },
  });

  // Return the newly created user as a JSON response with a 201 status (Created)
  return new Response(JSON.stringify(user), { status: 201 });
}
