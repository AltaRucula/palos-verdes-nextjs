import { createClaim, findClaims } from '@/lib/claims';
import { getErrors } from '@/lib/zod';
import { claimSchema } from '@/schemas/claims';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    const claims = await findClaims();
    if (claims) {
        return NextResponse.json(claims);
    } else {
        return NextResponse.json(
            { message: 'Error trying to get claims' },
            {
                status: 500,
            }
        );
    }
};

export const POST = async ({ json }: NextRequest) => {
    const newClaim = await json();

    try {
        claimSchema.parse(newClaim);
    } catch (e) {
        console.log(e);

        return NextResponse.json(
            { message: getErrors(e) },
            {
                status: 400,
            }
        );
    }

    const claim = await createClaim({
        ...newClaim,
        author: '67842ee973eb4f18cf2ebd12', // TODO get user id from cookie/session
    });
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to create a claim' },
            {
                status: 500,
            }
        );
    }
};
