'use server';

import { addMessage } from '@/lib/claims';
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

    const updatedClaim = await addMessage(actionState.payload.claimId, {
        content: message
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