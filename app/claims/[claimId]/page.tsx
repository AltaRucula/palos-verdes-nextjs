import { DeleteClaim } from '@/app/claims/[claimId]/DeleteClaim';
import { LoadingSkeleton } from '@/app/claims/[claimId]/LoadingSkeleton';
import { Messages } from '@/app/claims/[claimId]/Messages';
import { Card } from '@/components/Card';
import { Error } from '@/components/Error';
import { Tag } from '@/components/Tag';
import { findClaim } from '@/lib/claims';
import { formatDistanceToNow } from 'date-fns';
import { Suspense } from 'react';

const Claim = async ({claimId}: { claimId: string }) => {
    const claim = await findClaim(claimId);
    if (!claim) {
        return <Error/>
    }

    return (
        <div>
            <section className="flex flex-row justify-between items-center">
                <h1>{claim.title}</h1>
                <DeleteClaim claimId={JSON.parse(JSON.stringify(claim._id))} userId={claim.userId}/>
            </section>
            <Card>
                <section className="mt-4 ">
                    {claim.content}
                </section>
                <section className="mt-4 text-primary-700">
                    Created{' '}
                    {formatDistanceToNow(claim.createdAt, {
                        addSuffix: true
                    })}{' '}
                    by {claim.userId}

                </section>
                <section className="mt-4 text-primary-700">
                    {`Votes: ${claim.votes ?? 0}`}
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
            <Messages claimId={JSON.parse(JSON.stringify(claim._id))} messages={JSON.parse(JSON.stringify(claim.messages))}/>
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