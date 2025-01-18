'use server';

import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { createCookieSession, deleteSession } from '@/lib/session';
import { createUser, findUserByEmail } from '@/lib/users';
import { getErrors } from '@/lib/zod';
import { loginSchema, signupSchema } from '@/schemas/auth';
import { ActionState } from '@/types/actionState';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const login = async (actionState: ActionState, formData: FormData): Promise<ActionState> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        loginSchema.parse({
            email,
            password,
        });
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const user = await findUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
        await createCookieSession(user.id);
        return redirect('/');
    }

    return {
        ...actionState,
        errors: 'User not found',
    };
};

export const logout = async (): Promise<ActionState> => {
    await deleteSession();
    return redirect('/');
};

export const signup = async (actionState: ActionState, formData: FormData): Promise<ActionState> => {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const password = formData.get('password') as string;

    const data = {
        email,
        firstName,
        lastName,
        password,
    };

    try {
        signupSchema.parse(data);
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_OR_ROUND);

    const user = await createUser({
        ...data,
        password: hashedPassword,
    });

    if (!user) {
        return {
            ...actionState,
            errors: 'User could not be created',
        };
    }

    await createCookieSession(user.id);

    return redirect('/');
};
