"use server";

import { ActionState } from '@/actions/actionState';
import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { createSession } from '@/lib/session';
import { createUser } from '@/lib/users';
import { NewUser } from '@/types/user';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const signup = async (
    actionState: ActionState<NewUser>,
    formData: FormData
): Promise<ActionState<NewUser>> => {

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. Validate fields
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
        password: hashedPassword
    });

    console.info('signup', {
        user,
        email,
        password,
        hashedPassword
    })

    if (!user) {
        return {
            errors: 'User could not be created',
            success: false
        }
    }

    // 3. Create session
    await createSession(user._id);

    return redirect('/');
}