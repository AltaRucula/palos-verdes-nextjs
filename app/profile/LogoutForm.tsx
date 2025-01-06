'use client';

import { logout } from '@/app/profile/actions';
import { Button } from '@/components/Button';
import { useActionState } from 'react';

export const LogoutForm = () => {
    const [state, action, isPending] = useActionState(logout, {
        success: false
    });

    return (
        <form action={action}>
            <Button disabled={isPending} type="submit">Logout</Button>
        </form>
    )
};