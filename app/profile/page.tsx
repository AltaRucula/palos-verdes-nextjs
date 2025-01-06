import { LoadingSkeleton } from '@/app/profile/LoadingSkeleton';
import { LogoutForm } from '@/app/profile/LogoutForm';
import { Card } from '@/components/Card';
import { getSession } from '@/lib/session';
import { findUser } from '@/lib/users';
import { User } from '@/types/user';
import Link from 'next/link';
import { Suspense } from 'react';

const Profile = async () => {
    let user: User | null = null;
    const session = await getSession();
    const userId: string = session?.userId as string;
    if (userId) {
        user = await findUser(userId);
    }

    if (user === null) {
        return (
            <section>
                User not logged in !
                {' '}
                <Link href="/login">Click here</Link>
                {' '}
                to be redirected to login page.
            </section>
        )
    }

    return (
        <section>
            User email: {user.email}
            <LogoutForm/>
        </section>
    )
}

const Page = () => {
    return (
        <div className="flex-auto">
            <h1 className="mb-4">Profile</h1>

            <Card>
                <Suspense fallback={<LoadingSkeleton/>}>
                    <Profile/>
                </Suspense>
            </Card>

        </div>
    );
}
export default Page;