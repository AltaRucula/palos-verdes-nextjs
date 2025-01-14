'use client';

import { logout } from '@/app/profile/actions';
import { ButtonLink } from '@/components/ButtonLink';
import { useActionState } from 'react';

export const LogoutButton = () => {
    const [state, action, isPending] = useActionState(logout, {
        success: false
    });

    return (
        <form action={action}>
            <ButtonLink disabled={isPending} type="submit">Logout</ButtonLink>
        </form>
    )
};