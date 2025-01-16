'use server';

import { createSession } from '@/lib/session';
import { findUserByEmail } from '@/lib/users';
import { ActionState } from '@/types/actionState';
import { LoginFormData } from '@/types/user';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

type LoginStatePayload = {
    savedFormData: LoginFormData;
};

export const login = async (
    actionState: ActionState<LoginStatePayload>,
    formData: FormData
): Promise<ActionState<LoginStatePayload>> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const savedFormData: LoginFormData = {
        email,
    };

    // 1. Validate fields
    if (!email) {
        return {
            errors: 'Email is required',
            payload: {
                savedFormData,
            },
            success: false,
        };
    }

    if (!password) {
        return {
            errors: 'Password is required',
            payload: {
                savedFormData,
            },
            success: false,
        };
    }

    // 2. Find user
    const user = await findUserByEmail(email);

    // 3. Verify password hash
    if (user && user.password && bcrypt.compareSync(password, user.password)) {
        // 4. Create session
        await createSession(user.id);

        return redirect('/');
    }

    return {
        errors: 'User not found',
        success: false,
    };
};
