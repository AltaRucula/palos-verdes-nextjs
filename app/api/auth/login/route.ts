import { createSession } from '@/lib/session';
import { findUserByEmail } from '@/lib/users';
import { getErrors } from '@/lib/zod';
import { loginSchema } from '@/schemas/auth';
import { Login } from '@/types/auth';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async ({ json }: NextRequest) => {
    const login: Login = await json();

    try {
        loginSchema.parse(login);
    } catch (e) {
        return NextResponse.json(
            { message: getErrors(e) },
            {
                status: 400,
            }
        );
    }

    const user = await findUserByEmail(login.email);

    const userMatch = user && bcrypt.compareSync(login.password, user.password);
    if (!userMatch) {
        return NextResponse.json(
            { message: 'User not found' },
            {
                status: 404,
            }
        );
    }

    const session = await createSession(user.id);
    return NextResponse.json({
        session,
    });
};
