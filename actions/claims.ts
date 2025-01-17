'use server';

import { getClaimFormData } from '@/actions/utils';
import * as claims from '@/lib/claims';
import { addVote } from '@/lib/claims';
import { getSession } from '@/lib/session';
import { getErrors } from '@/lib/zod';
import { claimSchema, messageSchema } from '@/schemas/claims';
import { ActionState, TypedActionState } from '@/types/actionState';
import { Message } from '@/types/claims';
import { redirect } from 'next/navigation';

type EditClaimPayload = {
    claimAuthorId: string;
    claimId: string;
};

type DeleteClaimStatePayload = {
    claimId: string;
    userId: string;
};

type SubmitMessageStatePayload = {
    claimId: string;
    messages: Message[];
};

export const createClaim = async (actionState: ActionState, formData: FormData): Promise<ActionState> => {
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    const data = getClaimFormData(formData);

    try {
        claimSchema.parse(data);
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const newClaim = await claims.createClaim({
        ...data,
        author: currentSession?.userId as string,
    });

    if (!newClaim) {
        return {
            ...actionState,
            errors: 'Error creating claim',
        };
    }

    return redirect('/claims');
};

export const editClaim = async (
    actionState: TypedActionState<EditClaimPayload>,
    formData: FormData
): Promise<TypedActionState<EditClaimPayload>> => {
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    if (actionState.claimAuthorId !== (currentSession?.userId as string)) {
        return {
            ...actionState,
            errors: 'You are not allowed to edit this claim',
        };
    }

    const data = getClaimFormData(formData);

    try {
        claimSchema.parse(data);
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const claim = await claims.updateClaim(actionState.claimId, data);

    if (!claim) {
        return {
            ...actionState,
            errors: 'Error editing claim',
        };
    }

    redirect(`/claims/${claim.id}`);
};

export const deleteClaim = async (
    actionState: TypedActionState<DeleteClaimStatePayload>
): Promise<TypedActionState<DeleteClaimStatePayload>> => {
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    if (actionState.userId !== (currentSession?.userId as string)) {
        return {
            ...actionState,
            errors: 'You are not allowed to delete this claim',
        };
    }

    const claim = await claims.deleteClaim(actionState.claimId);

    if (!claim) {
        return {
            ...actionState,
            errors: 'Error deleting claim',
        };
    }

    redirect('/claims');
};

export const submitMessage = async (
    actionState: TypedActionState<SubmitMessageStatePayload>,
    formData: FormData
): Promise<TypedActionState<SubmitMessageStatePayload>> => {
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    const content = formData.get('content') as string;

    try {
        messageSchema.parse({
            content,
        });
    } catch (e) {
        return {
            ...actionState,
            errors: getErrors(e),
        };
    }

    const updatedClaim = await claims.addMessage(actionState.claimId, {
        content,
        author: currentSession?.userId as string,
    });

    if (!updatedClaim)
        return {
            ...actionState,
            errors: 'Error adding message to the claim',
        };

    return {
        ...actionState,
        messages: JSON.parse(JSON.stringify(updatedClaim.messages)),
    };
};

type VoteClaimPayload = {
    claimId: string;
    isClaimAlreadyVotedByUser: boolean;
    votes: number;
};

export const voteClaim = async (
    actionState: TypedActionState<VoteClaimPayload>
): Promise<TypedActionState<VoteClaimPayload>> => {
    const currentSession = await getSession();

    if (!currentSession) {
        return {
            ...actionState,
            errors: 'Invalid user session',
        };
    }

    const updatedClaim = await addVote(actionState.claimId, {
        author: currentSession?.userId as string,
    });

    if (!updatedClaim) {
        return {
            ...actionState,
            errors: 'Error adding vote to the claim',
        };
    }

    return {
        ...actionState,
        isClaimAlreadyVotedByUser: true,
        votes: updatedClaim.votes.length,
    };
};
