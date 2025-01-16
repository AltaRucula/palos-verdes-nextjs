import { createUser } from '@/lib/users';
import { NewUser } from '@/types/users';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async ({ body }: NextRequest) => {
    const claim = await createUser(body as unknown as NewUser);
    if (claim) {
        return NextResponse.json(claim);
    } else {
        return NextResponse.json({ message: 'Error trying to create a user' });
    }
};
