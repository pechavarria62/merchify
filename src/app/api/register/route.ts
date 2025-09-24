import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import type { User as DefUser } from '@/lib/definitions';
import { Prisma } from '@/generated/prisma/client';

export const runtime = 'nodejs';

/*
* get the interface but omit the password.
* This type is defined specifically for the
* object we send back to the browser after the
* user is created. It is a critical security 
* practice to never send a password back in an
* API response, not even the hashed one..
*/ 
type MerchiUser = Omit<DefUser, 'password'> & {
  name: string | null;
  username?: string | null;
  email: string | null;
  avatar?: string | null;
  createdAt?: string | null;
};

function PrismaError(err: unknown): err is Prisma.PrismaClientKnownRequestError {
  return typeof err === 'object' && err !== null && 'code' in (err as Record<string, unknown>);
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Expected application/json' }), {
        status: 415,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await req.json();
    console.log(body,'are we getting any data?')
    const {email, username,  password } = body ?? {};
  
    
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
    let saveTheUser;
    try{
      saveTheUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

    }catch (e) {
      console.error('Prisma create failed:', e);
      throw e;
    }
    

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
