'use server';

import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { getSession } from '@/lib/session';
import * as users from '@/lib/users';
import { findUser } from '@/lib/users';
import { ActionState } from '@/types/actionState';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

type ChangePasswordStatePayload = {
    userId: string;
};

export const changePassword = async (
    actionState: ActionState<ChangePasswordStatePayload>,
    formData: FormData
): Promise<ActionState<ChangePasswordStatePayload>> => {
    const currentSession = await getSession();
    const userId: string = currentSession?.userId as string;

    if (!userId) {
        return {
            errors: 'Invalid user session',
            success: false,
        };
    }

    if (!actionState.payload) {
        return {
            errors: 'Invalid payload',
            success: false,
        };
    }

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const newPasswordConfirmation = formData.get('newPasswordConfirmation') as string;

    if (!currentPassword) {
        return {
            errors: 'Current password is required',
            payload: {
                ...actionState.payload,
            },
            success: false,
        };
    }

    if (!newPassword) {
        return {
            errors: 'New password is required',
            payload: {
                ...actionState.payload,
            },
            success: false,
        };
    }

    if (!newPasswordConfirmation || newPasswordConfirmation !== newPassword) {
        return {
            errors: 'Passwords do not match',
            payload: {
                ...actionState.payload,
            },
            success: false,
        };
    }

    const user = await findUser(userId);

    if (!user || !user.password) {
        return {
            errors: 'User not found',
            payload: {
                ...actionState.payload,
            },
            success: false,
        };
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
        return {
            errors: 'Current password is incorrect',
            payload: {
                ...actionState.payload,
            },
            success: false,
        };
    }

    const hashedPassword = bcrypt.hashSync(newPassword, PASSWORD_SALT_OR_ROUND);

    const updatedUser = await users.updateUser(actionState.payload.userId, {
        password: hashedPassword,
    });

    if (!updatedUser) {
        return {
            errors: 'Error changing user password',
            success: false,
        };
    }

    redirect(`/profile`);
};
