"use client";

import { voteClaim } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import React, { useActionState } from 'react';

type Props = {
    claimId: string;
    isClaimAlreadyVotedByUser?: boolean;
}

export const VoteButton: React.FC<Props> = ({claimId, isClaimAlreadyVotedByUser}) => {
    const [state, action, isPending] = useActionState(voteClaim, {
        success: false,
        payload: {
            claimId: claimId,
            isClaimAlreadyVotedByUser: isClaimAlreadyVotedByUser ?? false
        }
    });

    const getText = () => {
        if (state.payload?.isClaimAlreadyVotedByUser) {
            return 'Already Voted'
        }
        if (isPending) {
            return 'Working';
        }
        return 'Vote'
    }

    return (
        <form action={action} className="flex flex-col">
            <Button disabled={state.payload?.isClaimAlreadyVotedByUser ?? isPending} type="submit">{getText()}</Button>
        </form>
    )
}