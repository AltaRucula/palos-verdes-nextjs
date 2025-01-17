import { addMessage } from '@/lib/claims';
import { getErrors } from '@/lib/zod';
import { messageSchema } from '@/schemas/claims';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

export const POST = async ({ json }: NextRequest, { params }: Props) => {
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

    const claim = await addMessage(claimId, {
        ...newMessage,
        author: '67842ee973eb4f18cf2ebd12', // TODO get user id from cookie/session
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
