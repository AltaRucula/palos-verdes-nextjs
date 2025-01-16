'use client';

import { logout } from '@/actions/users';
import { ButtonLink } from '@/components/ButtonLink';
import { useActionState } from 'react';

export const LogoutButton = () => {
    const [, action, isPending] = useActionState(logout, {});

    return (
        <form action={action}>
            <ButtonLink
                disabled={isPending}
                type="submit"
            >
                Logout
            </ButtonLink>
        </form>
    );
};
