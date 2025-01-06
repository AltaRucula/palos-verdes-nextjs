'use client';

import { deleteClaim } from '@/app/claims/new/actions';
import { Button } from '@/components/Button';
import { useActionState } from 'react';

type Props = {
    claimId: string;
    userId: string;
}

export const DeleteClaim = ({claimId, userId}: Props) => {
    const [state, action, isPending] = useActionState(deleteClaim, {
        success: false,
        payload: {
            claimId,
            userId
        }
    });

    return (
        <form action={action}>
            <Button disabled={isPending} type="submit">{isPending ? 'Working' : 'Delete this claim'}</Button>
        </form>
    )
}