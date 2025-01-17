import { findUser, updateUser } from '@/lib/users';
import { User } from '@/types/users';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
    params: Promise<{
        userId: string;
    }>;
};

export const GET = async (request: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { userId } = await params;

    const user = await findUser(userId);
    if (user) {
        return NextResponse.json(user);
    } else {
        return NextResponse.json({ message: 'Error trying to get user' });
    }
};

export const PUT = async ({ body }: NextRequest, { params }: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { userId } = await params;

    const user = await updateUser(userId, body as unknown as Partial<User>);
    if (user) {
        return NextResponse.json(user);
    } else {
        return NextResponse.json({ message: 'Error trying to get user' });
    }
};
