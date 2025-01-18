'use server';

import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { getCookieSession } from '@/lib/session';
import * as users from '@/lib/users';
import { findUser } from '@/lib/users';
import { getErrors } from '@/lib/zod';
import { passwordSchema, profileSchema } from '@/schemas/users';
import { TypedActionState } from '@/types/actionState';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

type ChangePasswordStatePayload = {
    userId: string;
};

type EditClaimStatePayload = {
    userId: string;
};

export const changePassword = async (
    actionState: TypedActionState<ChangePasswordStatePayload>,
    formData: FormData
): Promise<TypedActionState<ChangePasswordStatePayload>> => {
    const currentSession = await getCookieSession();
    const userId: string = currentSession?.userId as string;

    if (!userId) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const newPasswordConfirmation = formData.get('newPasswordConfirmation') as string;

    try {
        passwordSchema.parse({
            currentPassword,
            newPassword,
            newPasswordConfirmation,
        });
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const user = await findUser(userId);

    if (!user || !user.password) {
        return {
            ...actionState,
            errors: 'User not found',
        };
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
        return {
            ...actionState,
            errors: 'Current password is incorrect',
        };
    }

    const hashedPassword = bcrypt.hashSync(newPassword, PASSWORD_SALT_OR_ROUND);

    const updatedUser = await users.updateUser(actionState.userId, {
        password: hashedPassword,
    });

    if (!updatedUser) {
        return {
            ...actionState,
            errors: 'Error changing user password',
        };
    }

    redirect(`/profile`);
};

export const editProfile = async (
    actionState: TypedActionState<EditClaimStatePayload>,
    formData: FormData
): Promise<TypedActionState<EditClaimStatePayload>> => {
    const currentSession = await getCookieSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    const data = {
        email,
        firstName,
        lastName,
    };

    try {
        profileSchema.parse(data);
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const user = await users.updateUser(actionState.userId, data);

    if (!user) {
        return {
            ...actionState,
            errors: 'Error editing profile',
        };
    }

    redirect(`/profile`);
};
