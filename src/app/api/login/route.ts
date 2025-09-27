import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import type { User as DefUser } from "@/lib/definitions";
import { error } from "console";
import { prisma } from "@/lib/prisma";


const secreto = process.env.AUTH_SECRET;
if (!secreto) {
    throw new Error('The secret is missing')
}

type MerchiUser = Omit<DefUser, 'password'> & {createdAt?: string | null};

function MerchUser(user: any): MerchiUser {
    return {
        id: String(user.id),
        name: user.name ?? null,
        username: user.username ?? null,
        email: user.email ?? null,
        avatar: user.avatar ?? null,
        createdAt: user.createdAt ? String(user.createdAt) : null,

    };
}

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
            return new Response(JSON.stringify({error: 'application/json is missing'}), {status: 415});
        }
        const body = await req.json();
        const {email,password, identifier} = body ?? {}; 
        const getUser = (email??identifier) as string | undefined;

        if (!getUser || typeof getUser !== 'string' || !password || typeof password !== 'string') {
            return new Response(JSON.stringify({error: 'Missing credentials'}), {status: 400});
        }
        
        // gety the user by email or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [{email: getUser}, {username: getUser}],
            },
        });
        
        if (!user) {
            return new Response(JSON.stringify({error: 'Invalid credentials'}), { status: 401 });
        }
    }
}