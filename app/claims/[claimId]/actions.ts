'use server';

import { ActionState } from '@/actions/actionState';
import { addMessage } from '@/lib/claims';
import { Message } from '@/types/claim';

export const submitMessage = async (
    actionState: ActionState<Message[]>,
    formData: FormData
): Promise<ActionState<Message[]>> => {
    const claimId = formData.get('claimId') as string;
    if (!claimId) {
        return {
            errors: 'Claim ID is required',
            success: false
        }
    }

    const updatedClaim = await addMessage(claimId, {
        content: formData.get('message') as string
    });

    if (!updatedClaim) return {
        errors: 'Error adding message to the claim',
        success: false
    }

    return {
        payload: JSON.parse(JSON.stringify(updatedClaim.messages)),
        success: true
    }
}