'use server';

import * as claims from '@/lib/claims';
import { getSession } from '@/lib/session';
import { ActionState } from '@/types/actionState';
import { ClaimFormData } from '@/types/claim';
import { redirect } from 'next/navigation';

type EditClaimStatePayload = {
    claimAuthorId: string;
    claimId: string;
    formData: ClaimFormData;
}

export const editClaim = async (
    actionState: ActionState<EditClaimStatePayload>,
    formData: FormData
): Promise<ActionState<EditClaimStatePayload>> => {

    const currentSession = await getSession();

    if (!currentSession) {
        return {
            errors: 'Invalid user session',
            success: false
        }
    }

    if (!actionState.payload) {
        return {
            errors: 'Invalid payload',
            success: false
        }
    }

    if (actionState.payload.claimAuthorId !== currentSession?.userId as string) {
        return {
            errors: 'You are not allowed to edit this claim',
            success: false
        }
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rawTags = formData.get('tags') as string;
    const tags = rawTags.length > 0 ? rawTags.split(',') : [];

    const claimFormData = {
        title,
        content,
        tags
    }

    if (!title) {
        return {
            errors: 'Title is required',
            payload: {
                ...actionState.payload,
                formData: claimFormData
            },
            success: false
        }
    }

    if (!content) {
        return {
            errors: 'Content is required',
            payload: {
                ...actionState.payload,
                formData: claimFormData
            },
            success: false
        }
    }

    if (!tags || tags.length === 0) {
        return {
            errors: 'At least one tag is required',
            payload: {
                ...actionState.payload,
                formData: claimFormData
            },
            success: false
        }
    }

    const claim = await claims.updateClaim(actionState.payload.claimId, claimFormData);

    if (!claim) {
        return {
            errors: 'Error editing claim',
            success: false
        }
    }

    redirect(`/claims/${claim.id}`);
}