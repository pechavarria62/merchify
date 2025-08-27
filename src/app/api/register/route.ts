import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify(user), {
    status: 201,
  });
}
