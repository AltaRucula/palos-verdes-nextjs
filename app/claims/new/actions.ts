"use server";

import * as claims from '@/lib/claims';
import { getSession } from '@/lib/session';
import { ActionState } from '@/types/actionState';
import { ClaimFormData } from '@/types/claim';
import { redirect } from 'next/navigation';

type CreateClaimStatePayload = {
    claimFormData: ClaimFormData;
}

export const createClaim = async (
    actionState: ActionState<CreateClaimStatePayload>,
    formData: FormData
): Promise<ActionState<CreateClaimStatePayload>> => {

    const currentSession = await getSession();

    if (!currentSession) {
        return {
            errors: 'Invalid user session',
            success: false
        }
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rawTags = formData.get('tags') as string;
    const tags = rawTags.length > 0 ? rawTags.split(',') : [];

    const claimFormData: ClaimFormData = {
        title,
        content,
        tags
    }

    if (!title) {
        return {
            errors: 'Title is required',
            payload: {
                claimFormData
            },
            success: false
        }
    }

    if (!content) {
        return {
            errors: 'Content is required',
            payload: {
                claimFormData
            },
            success: false
        }
    }

    if (!tags || tags.length === 0) {
        return {
            errors: 'At least one tag is required',
            payload: {
                claimFormData
            },
            success: false
        }
    }

    const newClaim = await claims.createClaim({
        ...claimFormData,
        author: currentSession?.userId as string
    })

    if (!newClaim) {
        return {
            errors: 'Error creating claim',
            success: false
        }
    }

    return redirect('/claims');
}