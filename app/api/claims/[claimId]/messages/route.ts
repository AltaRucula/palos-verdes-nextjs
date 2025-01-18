import { getUserIdFromAuthHeader } from '@/app/api/utils';
import { addMessage } from '@/lib/claims';
import { getErrors } from '@/lib/zod';
import { messageSchema } from '@/schemas/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const POST = async ({ headers, json }: NextRequest, { params }: Props) => {
    const { claimId } = await params;
    const newMessage = await json();

    try {
        messageSchema.parse(newMessage);
    } catch (e) {
        return NextResponse.json(
            { message: getErrors(e) },
            {
                status: 400,
            }
        );
    }

    const userId = await getUserIdFromAuthHeader(headers);

    const claim = await addMessage(claimId, {
        ...newMessage,
        author: userId,
    });

    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json(
            { message: 'Error trying to create post message' },
            {
                status: 500,
            }
        );
    }
};
