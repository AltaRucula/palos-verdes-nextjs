import { deleteClaim, findClaim, updateClaim } from '@/lib/claims';
import { getErrors } from '@/lib/zod';
import { claimSchema } from '@/schemas/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const GET = async ({}: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const claim = await findClaim(claimId);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to get claim' },
            {
                status: 500,
            }
        );
    }
};

export const PUT = async ({ json }: NextRequest, { params }: Props) => {
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

export const DELETE = async ({}: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

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
