import { LoadingSkeleton } from '@/app/profile/LoadingSkeleton';
import { LogoutButton } from '@/app/profile/LogoutButton';
import { Card } from '@/components/Card';
import { ForbiddenError } from '@/components/ForbiddenError';
import { getSession } from '@/lib/session';
import { findUser } from '@/lib/users';
import { User } from '@/types/users';
import Link from 'next/link';
import { Suspense } from 'react';

const Profile = async () => {
    let user: User | null = null;
    const currentSession = await getSession();
    const userId: string = currentSession?.userId as string;
    if (userId) {
        user = await findUser(userId);
    }

    if (!user) {
        return <ForbiddenError />;
    }

    return (
        <section>
            Hello {user.firstName}
            <ul className="list-disc ml-4 mt-8">
                <li>
                    <Link href="/profile/edit">Edit Profile</Link>
                </li>
                <li>
                    <Link href="/profile/password">Change Password</Link>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </section>
    );
};

const Page = () => {
    return (
        <div className="flex-auto">
            <h1 className="mb-4">Profile</h1>

            <Card>
                <Suspense fallback={<LoadingSkeleton />}>
                    <Profile />
                </Suspense>
            </Card>
        </div>
    );
};
export default Page;
