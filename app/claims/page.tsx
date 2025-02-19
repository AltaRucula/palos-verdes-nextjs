import { LoadingSkeleton } from '@/app/claims/LoadingSkeleton';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';
import { findClaims } from '@/lib/claims';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Suspense } from 'react';

const Claims = async () => {
    const claims = await findClaims();

    if (!claims || claims.length === 0)
        return (
            <div className="flex flex-col items-center justify-center mt-12">
                <h1 className="text-2xl">No claims yet</h1>
                <p>Create a new claim to get started</p>
            </div>
        );

    return (
        <div>
            {claims?.map((claim, index) => (
                <Link
                    href={`/claims/${claim.id}`}
                    key={index}
                >
                    <Card
                        className="hover:bg-secondary-light dark:hover:bg-secondary-dark"
                        title={claim.title}
                    >
                        <section className="mt-4 text-sm">
                            Created{' '}
                            {formatDistanceToNow(claim.createdAt, {
                                addSuffix: true,
                            })}
                        </section>
                        <section className="flex flex-wrap mt-4">
                            {claim.tags.map((tag, index) => (
                                <Tag key={index}>{tag}</Tag>
                            ))}
                        </section>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

const Page = async () => {
    return (
        <div className="flex-auto">
            <section className="flex flex-row justify-between align-middle">
                <h1>Claims</h1>
                <Link href="/claims/new">
                    <Button className="mt-0">New Claim</Button>
                </Link>
            </section>

            <Suspense fallback={<LoadingSkeleton />}>
                <Claims />
            </Suspense>
        </div>
    );
};

export default Page;
