"use server";

import { createSession } from '@/lib/session';
import { findUserByEmail } from '@/lib/users';
import { ActionState } from '@/types/actionState';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const login = async (
    actionState: ActionState<null>,
    formData: FormData
): Promise<ActionState<null>> => {

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

    // 2. Find user
    const user = await findUserByEmail(email);

    // 3. Verify password hash
    if (user && bcrypt.compareSync(password, user.password)) {
        // 4. Create session
        await createSession(user.id);

        return redirect('/');
    }

    return {
        errors: 'User not found',
        success: false
    }
}