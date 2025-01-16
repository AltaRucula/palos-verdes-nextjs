import { deleteClaim, findClaim, updateClaim } from '@/lib/claims';
import { Claims } from '@/types/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const GET = async (request: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const claim = await findClaim(claimId);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json({ message: 'Error trying to get claim' });
    }
};

export const PUT = async ({ body }: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const claim = await updateClaim(claimId, body as unknown as Claims);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json({ message: 'Error trying to get claim' });
    }
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    const claim = await deleteClaim(claimId);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json({ message: 'Error trying to get claim' });
    }
};
