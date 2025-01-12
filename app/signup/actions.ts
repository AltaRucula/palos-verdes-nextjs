"use server";

import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { createSession } from '@/lib/session';
import { createUser } from '@/lib/users';
import { ActionState } from '@/types/actionState';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const signup = async (
    actionState: ActionState<null>,
    formData: FormData
): Promise<ActionState<null>> => {

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. Validate fields
    if (!firstName) {
        return {
            errors: 'First name is required',
            success: false
        }
    }

    if (!lastName) {
        return {
            errors: 'Last name is required',
            success: false
        }
    }

    if (!email) {
        return {
            errors: 'Email is required',
            success: false
        }
    }

    if (!password) {
        return {
            errors: 'Password is required',
            success: false
        }
    }

    // 2. Create user
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_OR_ROUND)

    const user = await createUser({
        email,
        firstName,
        lastName,
        password: hashedPassword
    });

    if (!user) {
        return {
            errors: 'User could not be created',
            success: false
        }
    }

    // 3. Create session
    await createSession(user.id);

    return redirect('/');
}