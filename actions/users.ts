'use server';

import { PASSWORD_SALT_OR_ROUND } from '@/lib/env';
import { createSession, deleteSession, getSession } from '@/lib/session';
import * as users from '@/lib/users';
import { createUser, findUser, findUserByEmail } from '@/lib/users';
import { ActionState, TypedActionState } from '@/types/actionState';
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
    const currentSession = await getSession();
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

    if (!currentPassword) {
        return {
            ...actionState,
            errors: 'Current password is required',
        };
    }

    if (!newPassword) {
        return {
            ...actionState,
            errors: 'New password is required',
        };
    }

    if (!newPasswordConfirmation || newPasswordConfirmation !== newPassword) {
        return {
            ...actionState,
            errors: 'Passwords do not match',
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
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
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
            ...actionState,
            errors: 'Email is required',
        };
    }

    if (!firstName) {
        return {
            ...actionState,
            errors: 'First Name is required',
        };
    }

    if (!lastName) {
        return {
            ...actionState,
            errors: 'Last Name is required',
        };
    }

    const user = await users.updateUser(actionState.userId, savedFormData);

    if (!user) {
        return {
            ...actionState,
            errors: 'Error editing profile',
        };
    }

    redirect(`/profile`);
};

export const login = async (actionState: ActionState, formData: FormData): Promise<ActionState> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // 1. Validate fields
    if (!email) {
        return {
            ...actionState,
            errors: 'Email is required',
        };
    }

    if (!password) {
        return {
            ...actionState,
            errors: 'Password is required',
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

    if (!firstName) {
        return {
            ...actionState,
            errors: 'First name is required',
        };
    }

    if (!lastName) {
        return {
            ...actionState,
            errors: 'Last name is required',
        };
    }

    if (!email) {
        return {
            ...actionState,
            errors: 'Email is required',
        };
    }

    if (!password) {
        return {
            ...actionState,
            errors: 'Password is required',
        };
    }

    const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_OR_ROUND);

    const user = await createUser({
        email,
        firstName,
        lastName,
        password: hashedPassword,
    });

    if (!user) {
        return {
            ...actionState,
            errors: 'User could not be created',
        };
    }

    await createSession(user.id);

    return redirect('/');
};
