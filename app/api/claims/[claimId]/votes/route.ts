import { getUserIdFromAuthHeader } from '@/app/api/utils';
import { addVote, hasAlreadyVoted } from '@/lib/claims';
import { NewVote } from '@/types/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const POST = async ({ headers }: NextRequest, { params }: Props) => {
    const { claimId } = await params;

    const userId = await getUserIdFromAuthHeader(headers);

    if (await hasAlreadyVoted(claimId, userId)) {
        return NextResponse.json(
            { message: 'You already voted for this claim' },
            {
                status: 400,
            }
        );
    }

    const vote: NewVote = {
        author: userId,
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
