import { getSession } from '@/lib/session';

export const getUserIdFromAuthHeader = async (headers: Headers): Promise<string> => {
    const authorization = headers.get('Authorization');
    if (!authorization) {
        // This shouldn't happen since the middleware will catch this
        throw new Error('Missing Authorization');
    }

    const session = await getSession(authorization);
    if (!session || !session.userId) {
        // Again, this shouldn't happen since the middleware will catch this
        throw new Error('Unauthorized');
    }

    return session.userId as string;
};
