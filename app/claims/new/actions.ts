"use server";

import * as claims from '@/lib/claims';
import { getSession } from '@/lib/session';
import { ActionState } from '@/types/actionState';
import { redirect } from 'next/navigation';

export const createClaim = async (
    actionState: ActionState<null>,
    formData: FormData
): Promise<ActionState<null>> => {

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rawTags = formData.get('tags') as string;
    const tags = rawTags.length > 0 ? rawTags.split(',') : [];

    if (!title) {
        return {
            errors: 'Title is required',
            success: false
        }
    }

    if (!content) {
        return {
            errors: 'Content is required',
            success: false
        }
    }

    if (!tags || tags.length === 0) {
        return {
            errors: 'At least one tag is required',
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

    const claim = await claims.createClaim({
        content,
        tags,
        title,
        userId: currentSession?.userId as string
    })

    if (!claim) {
        return {
            errors: 'Error creating claim',
            success: false
        }
    }

    return redirect('/claims');
}

type DeleteClaimStatePayload = {
    claimId: string;
    userId: string;
}

export const deleteClaim = async (
    actionState: ActionState<DeleteClaimStatePayload>,
    formData: FormData
): Promise<ActionState<DeleteClaimStatePayload>> => {

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

    if (actionState.payload.userId !== currentSession?.userId as string) {
        return {
            errors: 'You are not allowed to delete this claim',
            success: false
        }
    }

    const claim = await claims.deleteClaim(actionState.payload.claimId);

    if (!claim) {
        return {
            errors: 'Error deleting claim',
            success: false
        }
    }

    redirect('/claims');
}