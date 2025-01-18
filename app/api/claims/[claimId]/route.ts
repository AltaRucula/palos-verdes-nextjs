import { getUserIdFromAuthHeader } from '@/app/api/utils';
import { deleteClaim, findClaim, getClaimAuthor, updateClaim } from '@/lib/claims';
import { getErrors } from '@/lib/zod';
import { claimSchema } from '@/schemas/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const GET = async ({ headers }: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const claim = await findClaim(claimId);
    if (claim) {
        const userId = await getUserIdFromAuthHeader(headers);

        // Get if the user is claim author
        const isAuthor = claim.author.id === userId;

        // Get if the user already voted for this claim
        const hasVoted = claim.votes.some((vote) => vote.author.id === userId);

        return NextResponse.json({
            ...claim,
            isAuthor,
            hasVoted,
        });
    } else {
        return NextResponse.json(
            { message: 'Error trying to get claim' },
            {
                status: 500,
            }
        );
    }
};

export const PUT = async ({ headers, json }: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;
    const modifiedClaim = await json();

    try {
        claimSchema.parse(modifiedClaim);
    } catch (e) {
        return NextResponse.json(
            { message: getErrors(e) },
            {
                status: 400,
            }
        );
    }

    const userId = await getUserIdFromAuthHeader(headers);
    const claimAuthor = await getClaimAuthor(claimId);

    if (claimAuthor !== userId) {
        return NextResponse.json(
            { message: 'You are not the author of this claim' },
            {
                status: 401,
            }
        );
    }

    const claim = await updateClaim(claimId, modifiedClaim);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to edit claim' },
            {
                status: 500,
            }
        );
    }
};

export const DELETE = async ({ headers }: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const userId = await getUserIdFromAuthHeader(headers);
    const claimAuthor = await getClaimAuthor(claimId);

    if (claimAuthor !== userId) {
        return NextResponse.json(
            { message: 'You are not the author of this claim' },
            {
                status: 401,
            }
        );
    }

    const claim = await deleteClaim(claimId);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to delete claim' },
            {
                status: 500,
            }
        );
    }
};
