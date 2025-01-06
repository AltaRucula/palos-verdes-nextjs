import { createClaim, findClaims } from '@/lib/claims';
import { Claim } from '@/types/claim';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    const claims = await findClaims();
    if (claims) {
        return NextResponse.json(claims);
    } else {
        return NextResponse.json({message: 'Error trying to get claims'});
    }
}

export const POST = async ({body}: NextRequest) => {
    const claim = await createClaim(body as unknown as Claim);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json({message: 'Error trying to create a claim'});
    }
}