// Prevent this file from being used in client components
import 'server-only';

import { SESSION_SECRET } from '@/lib/env';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'session';
const COOKIE_DURATION = 24 * 60 * 60 * 1000;
const SESSION_KEY = new TextEncoder().encode(SESSION_SECRET);
const JWT_ALGORITHMS = 'HS256';

const encrypt = (payload: JWTPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: JWT_ALGORITHMS })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(SESSION_KEY);
};

const decrypt = async (session: string) => {
    try {
        const { payload } = await jwtVerify(session, SESSION_KEY, {
            algorithms: [JWT_ALGORITHMS],
        });
        return payload;
    } catch (error) {
        console.error('Error trying to decrypt session', error);
        return null;
    }
};

export const createSession = async (userId: string) => {
    const expires = new Date(Date.now() + COOKIE_DURATION);
    const session = await encrypt({ userId, expires });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, session, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
        expires,
    });
};

export const getSession = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;
    if (!cookie) {
        return null;
    }
    const session = await decrypt(cookie);
    if (!session?.userId) {
        return null;
    }

    return session;
};

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect('/login');
};
