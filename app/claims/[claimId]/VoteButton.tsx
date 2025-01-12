"use client";

import { voteClaim } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { useActionState } from 'react';

type Props = {
    claimId: string;
    isClaimAlreadyVotedByUser?: boolean;
}

export const VoteButton = (props: Props) => {
    const [state, action, isPending] = useActionState(voteClaim, {
        success: false,
        payload: {
            claimId: props.claimId,
            isClaimAlreadyVotedByUser: props.isClaimAlreadyVotedByUser ?? false
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