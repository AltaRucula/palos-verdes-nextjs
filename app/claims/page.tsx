import { LoadingSkeleton } from '@/app/claims/LoadingSkeleton';
import { Card } from '@/components/Card';
import { FetchError } from '@/components/FetchError';
import { Tag } from '@/components/Tag';
import { findClaims } from '@/lib/claims';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Suspense } from "react";

const Claims = async () => {
    const claims = await findClaims();
    if (!claims) {
        return <FetchError/>
    }

    return <div>
        {claims?.map((claim, index) => (
            <Link href={`/claims/${claim._id}`} key={index}>
                <Card title={claim.title}>
                    <section className="mt-4">
                        {formatDistanceToNow(claim.createdAt, {
                            addSuffix: true
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
}

const Page = async () => {
    return (
        <div className="flex-auto">
            <h1>Claims</h1>
            <Suspense fallback={<LoadingSkeleton/>}>
                <Claims/>
            </Suspense>
        </div>
    );
}

export default Page;