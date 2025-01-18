import { ChangePasswordForm } from '@/app/profile/password/ChangePasswordForm';
import { ForbiddenError } from '@/components/ForbiddenError';
import { getCookieSession } from '@/lib/session';
import React from 'react';

const Page: React.FC = async () => {
    const currentSession = await getCookieSession();
    const userId: string = currentSession?.userId as string;

    if (!userId) {
        return <ForbiddenError />;
    }

    return (
        <div className="mx-auto">
            <ChangePasswordForm userId={userId} />
        </div>
    );
};

export default Page;
