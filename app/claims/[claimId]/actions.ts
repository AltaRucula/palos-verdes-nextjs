'use server';

import { addMessage, addVote } from '@/lib/claims';
import { getSession } from '@/lib/session';
import { ActionState } from '@/types/actionState';
import { Message } from '@/types/claim';

type SubmitMessageStatePayload = {
    claimId: string;
    messages: Message[];
}

export const submitMessage = async (
    actionState: ActionState<SubmitMessageStatePayload>,
    formData: FormData
): Promise<ActionState<SubmitMessageStatePayload>> => {
    if (!actionState.payload) {
        return {
            errors: 'Invalid payload',
            success: false
        }
    }

    const message = formData.get('message') as string;
    if (!message) {
        return {
            errors: 'Message is required',
            success: false
        }
    }

    const currentSession = await getSession();

    if (!currentSession) {
        return {
            errors: 'Invalid user session',
            success: false
        }
    }

    const updatedClaim = await addMessage(actionState.payload.claimId, {
        content: message,
        author: currentSession?.userId as string
    });

    if (!updatedClaim) return {
        errors: 'Error adding message to the claim',
        success: false
    }

    return {
        payload: {
            ...actionState.payload,
            messages: JSON.parse(JSON.stringify(updatedClaim.messages))
        },
        success: true
    }
}

type VoteClaimPayload = {
    claimId: string;
    isClaimAlreadyVotedByUser: boolean;
}

export const voteClaim = async (
    actionState: ActionState<VoteClaimPayload>
): Promise<ActionState<VoteClaimPayload>> => {
    if (!actionState.payload) {
        return {
            errors: 'Invalid payload',
            success: false
        }
    }

    const currentSession = await getSession();

    if (!currentSession) {
        return {
            errors: 'Invalid user session',
            success: false
        }
    }

    const updatedClaim = await addVote(actionState.payload.claimId, {
        author: currentSession?.userId as string
    });

    if (!updatedClaim) return {
        errors: 'Error adding vote to the claim',
        success: false
    }

    return {
        payload: {
            ...actionState.payload,
            isClaimAlreadyVotedByUser: true
        },
        success: true
    }
}