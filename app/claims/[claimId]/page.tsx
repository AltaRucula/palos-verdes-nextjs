'use server';

import { LoadingSkeleton } from '@/app/claims/[claimId]/LoadingSkeleton';
import { Messages } from '@/app/claims/[claimId]/Messages';
import { Card } from '@/components/Card';
import { FetchError } from '@/components/FetchError';
import { Tag } from '@/components/Tag';
import { findClaim } from '@/lib/claims';
import { formatDistanceToNow } from 'date-fns';
import { Suspense } from 'react';

const Claim = async ({claimId}: { claimId: string }) => {
    const claim = await findClaim(claimId);
    if (!claim) {
        return <FetchError/>
    }

    return (
        <div>
            <h1>{claim.title}</h1>
            <Card>
                <section className="mt-4 ">
                    {claim.content}
                </section>
                <section className="mt-4 text-emerald-700">
                    Created{' '}
                    {formatDistanceToNow(claim.createdAt, {
                        addSuffix: true
                    })}{' '}
                    by {claim.author}

                </section>
                <section className="mt-4 text-emerald-700">
                    {`Votes: ${claim.votes}`}
                </section>
                <section className="flex flex-wrap mt-4">
                    {claim.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </section>
            </Card>

            <h1>Messages</h1>

            {/*Need to serialize the data to be able to send it to the client component*/}
            {/*https://github.com/vercel/next.js/discussions/46137#discussioncomment-5047095*/}
            <Messages claimId={JSON.stringify(claim._id)} messages={JSON.parse(JSON.stringify(claim.messages))}/>
        </div>
    )
}

type Props = {
    params: Promise<{
        claimId: string;
    }>;
}

const Page = async ({params}: Props) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const {claimId} = await params;


    return (
        <div className="flex-auto">
            <Suspense fallback={<LoadingSkeleton/>}>
                <Claim claimId={claimId}/>
            </Suspense>
        </div>
    )
}

export default Page;