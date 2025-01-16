'use server';

import { getSession } from '@/lib/session';
import * as users from '@/lib/users';
import { ActionState } from '@/types/actionState';
import { ProfileEditFormData } from '@/types/user';
import { redirect } from 'next/navigation';

type EditClaimStatePayload = {
    savedFormData: ProfileEditFormData;
    userId: string;
};

export const editProfile = async (
    actionState: ActionState<EditClaimStatePayload>,
    formData: FormData
): Promise<ActionState<EditClaimStatePayload>> => {
    const currentSession = await getSession();

    if (!currentSession) {
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

    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    const savedFormData = {
        email,
        firstName,
        lastName,
    };

    if (!email) {
        return {
            errors: 'Email is required',
            payload: {
                ...actionState.payload,
                savedFormData,
            },
            success: false,
        };
    }

    if (!firstName) {
        return {
            errors: 'First Name is required',
            payload: {
                ...actionState.payload,
                savedFormData,
            },
            success: false,
        };
    }

    if (!lastName) {
        return {
            errors: 'Last Name is required',
            payload: {
                ...actionState.payload,
                savedFormData,
            },
            success: false,
        };
    }

    const user = await users.updateUser(actionState.payload.userId, savedFormData);

    if (!user) {
        return {
            errors: 'Error editing profile',
            success: false,
        };
    }

    redirect(`/profile`);
};
