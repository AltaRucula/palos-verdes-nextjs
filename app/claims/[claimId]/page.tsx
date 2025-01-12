import { DeleteClaim } from '@/app/claims/[claimId]/DeleteClaim';
import { LoadingSkeleton } from '@/app/claims/[claimId]/LoadingSkeleton';
import { Messages } from '@/app/claims/[claimId]/Messages';
import { VoteButton } from '@/app/claims/[claimId]/VoteButton';
import { Card } from '@/components/Card';
import { Error } from '@/components/Error';
import { Tag } from '@/components/Tag';
import { findClaim } from '@/lib/claims';
import { getSession } from '@/lib/session';
import { formatDistanceToNow } from 'date-fns';
import { Suspense } from 'react';

const Claim = async ({claimId}: { claimId: string }) => {
    const claim = await findClaim(claimId);
    if (!claim) {
        return <Error/>
    }

    const currentSession = await getSession();
    const currentSessionUserId = currentSession?.userId as string
    const isClaimOwnedByUser = claim.author.id === currentSessionUserId;
    const isClaimAlreadyVotedByUser = claim.votes?.map(vote => vote.author.id).includes(currentSessionUserId);

    return (
        <div>
            <section className="flex flex-row justify-between items-center">
                <h1>{claim.title}</h1>
                <div className="flex flex-column gap-4">
                    <VoteButton claimId={claim.id} isClaimAlreadyVotedByUser={isClaimAlreadyVotedByUser}/>
                    {isClaimOwnedByUser && <DeleteClaim claimId={claim.id} userId={claim.author.id}/>}
                </div>
            </section>
            <Card>
                <section className="mt-4 ">
                    {claim.content}
                </section>
                <section className="mt-4 text-primary-700 text-sm">
                    {`Votes: ${claim.votes?.length ?? 0}`}
                </section>
                <section className="mt-4 text-primary-700 text-xs">
                    {`Created ${formatDistanceToNow(claim.createdAt, {addSuffix: true})} by ${claim.author.firstName}`}
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
            <Messages claimId={claim.id} messages={JSON.parse(JSON.stringify(claim.messages))}/>
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