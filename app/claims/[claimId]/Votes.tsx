'use client';

import { voteClaim } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import React, { useActionState } from 'react';

type Props = {
    claimId: string;
    isClaimAlreadyVotedByUser?: boolean;
    votes?: number;
}

export const Votes: React.FC<Props> = ({claimId, isClaimAlreadyVotedByUser, votes}) => {
    const [state, action, isPending] = useActionState(voteClaim, {
        success: false,
        payload: {
            claimId: claimId,
            isClaimAlreadyVotedByUser: isClaimAlreadyVotedByUser ?? false,
            votes: votes ?? 0
        }
    });

    return (
        <div className="flex flex-col">
            {`Votes: ${state.payload?.votes}`}
            <form action={action}>
                <Button
                    disabled={state.payload?.isClaimAlreadyVotedByUser ?? isPending}
                    type="submit">
                    {isPending ? 'Working' : 'Vote'}
                </Button>
            </form>
        </div>
    )
}