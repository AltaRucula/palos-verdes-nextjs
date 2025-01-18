import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { createSession } from '@/lib/session';
import { createUser } from '@/lib/users';
import { getErrors } from '@/lib/zod';
import { signupSchema } from '@/schemas/auth';
import { Signup } from '@/types/auth';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async ({ json }: NextRequest) => {
    const signup: Signup = await json();

    try {
        signupSchema.parse(signup);
    } catch (e) {
        return NextResponse.json(
            { message: getErrors(e) },
            {
                status: 400,
            }
        );
    }

    const hashedPassword = bcrypt.hashSync(signup.password, PASSWORD_SALT_OR_ROUND);

    const user = await createUser({
        ...signup,
        password: hashedPassword,
    });

    if (!user) {
        return NextResponse.json(
            {
                message: 'User could not be created',
            },
            {
                status: 500,
            }
        );
    }

    const session = await createSession(user.id);
    return NextResponse.json({
        session,
    });
};
