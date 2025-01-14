import { EditForm } from '@/app/profile/edit/EditForm';
import { LoadingSkeleton } from '@/app/profile/edit/LoadingSkeleton';
import { UserNotLoggedIn } from '@/app/profile/UserNotLoggedIn';
import { getSession } from '@/lib/session';
import { findUser } from '@/lib/users';
import React, { Suspense } from 'react';

const User: React.FC = async () => {
    let user;
    const currentSession = await getSession();
    const userId: string = currentSession?.userId as string;
    if (userId) {
        user = await findUser(userId);
    }

    if (!user) {
        return (
            <UserNotLoggedIn/>
        )
    }

    return (
        <EditForm
            formData={{
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }}
            userId={user.id}
        />
    )
}

const Page: React.FC = async () => {
    return (
        <div className="mx-auto">
            <Suspense fallback={<LoadingSkeleton/>}>
                <User/>
            </Suspense>
        </div>
    )
}

export default Page;