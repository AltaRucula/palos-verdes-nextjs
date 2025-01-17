import { addVote } from '@/lib/claims';
import { NewVote } from '@/types/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const POST = async ({}: NextRequest, { params }: Props) => {
    const { claimId } = await params;
    const vote: NewVote = {
        author: '67842ee973eb4f18cf2ebd12', // TODO get user id from cookie/session
    };

    const claim = await addVote(claimId, vote);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to vote claim' },
            {
                status: 500,
            }
        );
    }
};
