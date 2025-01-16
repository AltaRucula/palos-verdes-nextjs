import { ChangePasswordForm } from '@/app/profile/password/ChangePasswordForm';
import { UserNotLoggedIn } from '@/app/profile/UserNotLoggedIn';
import { getSession } from '@/lib/session';
import React from 'react';

const Page: React.FC = async () => {
    const currentSession = await getSession();
    const userId: string = currentSession?.userId as string;

    if (!userId) {
        return (
            <div className="mx-auto">
                <UserNotLoggedIn />
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <ChangePasswordForm userId={userId} />
        </div>
    );
};

export default Page;
