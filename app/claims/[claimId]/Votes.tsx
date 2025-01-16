'use client';

import { voteClaim } from '@/actions/claims';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import React, { useActionState } from 'react';

type Props = {
    claimId: string;
    isClaimAlreadyVotedByUser?: boolean;
    votes?: number;
};

export const Votes: React.FC<Props> = ({ claimId, isClaimAlreadyVotedByUser, votes }) => {
    const [{ errors: serverErrors, ...state }, action, isPending] = useActionState(voteClaim, {
        claimId: claimId,
        isClaimAlreadyVotedByUser: isClaimAlreadyVotedByUser ?? false,
        votes: votes ?? 0,
    });

    return (
        <div className="flex flex-row items-center gap-4">
            {`Votes: ${state.votes}`}
            <form action={action}>
                <Button
                    className="m-0 p-0"
                    disabled={state.isClaimAlreadyVotedByUser ?? isPending}
                    type="submit"
                >
                    {isPending ? 'Working' : 'Vote'}
                </Button>

                {serverErrors && <ErrorField>{serverErrors}</ErrorField>}
            </form>
        </div>
    );
};
