// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcrypt';

// export async function POST(req: Request) {
//   const body = await req.json();
//   console.log(body,'<-----')
//   const { username, email, password } = body;
//   console.log(username, email, password,'<-----')
//   const hashedPassword = await bcrypt.hash(
//     password,
//     10
//   );

//   const user = await prisma.user.create({
//     data: {
//       username,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return new Response(JSON.stringify(user), {
//     status: 201,
//   });
// }
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import type { User as DefUser } from '@/lib/definitions';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/binary.js';


// get the interface but omit the password field.
type MerchiUser = Omit<DefUser, 'password'> & {
  name: string | null;
  username?: string | null;
  email: string | null;
  avatar?: string | null;
  createdAt?: string | null;
};

function PrismaError(err: unknown): err is PrismaClientKnownRequestError {
  return typeof err === 'object' && err !== null && 'code' in (err as Record<string, unknown>);
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get('content-type') ?? '';
    console.log(ct,'<-----')
    if (!ct.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Expected application/json' }), {
        status: 415,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await req.json();
    const { username, email, password } = body ?? {};
  
    
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid or missing email' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be a string with at least 8 characters' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (username !== undefined && typeof username !== 'string') {
      return new Response(JSON.stringify({ error: 'Username must be a string' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const saveTheUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    

    const userRaw = saveTheUser as unknown as {
      id: number | string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      avatar?: string | null;
      createdAt?: Date | string | null;
    };
    const safeUser: MerchiUser = {
      id: String(userRaw.id),
      name: userRaw.name ?? null,
      username: userRaw.username ?? null,
      email: userRaw.email ?? null,
      avatar: userRaw.avatar ?? null,
      createdAt: userRaw.createdAt ? String(userRaw.createdAt) : null,
    };

    return new Response(JSON.stringify(safeUser), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: unknown) {
    // Handle Prisma unique constraint error (duplicate email/username)
    // Prisma known error (unique constraint)
    if (PrismaError(err) && err.code === 'P2002') {
      const target = (err.meta?.target && Array.isArray(err.meta.target))
        ? (err.meta.target as string[]).join(', ')
        : 'field';
      return new Response(JSON.stringify({ error: `${target} already exists` }), {
        status: 409,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Log internally; don't log sensitive request bodies or passwords
    console.error('Registration error:', err);

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
