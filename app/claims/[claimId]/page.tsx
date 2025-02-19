import { DeleteButton } from '@/app/claims/[claimId]/DeleteButton';
import { LoadingSkeleton } from '@/app/claims/[claimId]/LoadingSkeleton';
import { Messages } from '@/app/claims/[claimId]/Messages';
import { Votes } from '@/app/claims/[claimId]/Votes';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';
import { findClaim } from '@/lib/claims';
import { getCookieSession } from '@/lib/session';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

type ClaimProps = {
    claimId: string;
};

const Claim: React.FC<ClaimProps> = async ({ claimId }) => {
    const claim = await findClaim(claimId);
    if (!claim) {
        return notFound();
    }

    const currentSession = await getCookieSession();
    const currentSessionUserId = currentSession?.userId as string;
    const isClaimOwnedByUser = claim.author.id === currentSessionUserId;
    const isClaimAlreadyVotedByUser = claim.votes?.map((vote) => vote.author.id).includes(currentSessionUserId);

    return (
        <div>
            <section className="flex flex-row justify-between items-center">
                <h1>{claim.title}</h1>
                <div className="flex flex-column gap-4">
                    {isClaimOwnedByUser && (
                        <Link href={`/claims/${claim.id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                    )}
                    {isClaimOwnedByUser && (
                        <DeleteButton
                            claimId={claim.id}
                            userId={claim.author.id}
                        />
                    )}
                </div>
            </section>
            <Card>
                <section className="mt-4 ">{claim.content}</section>
                <section className="mt-4 text-sm">
                    <Votes
                        claimId={claim.id}
                        isClaimAlreadyVotedByUser={isClaimAlreadyVotedByUser}
                        votes={claim.votes?.length}
                    />
                </section>
                <section className="mt-4 text-xs">
                    {`Created ${formatDistanceToNow(claim.createdAt, { addSuffix: true })} by ${claim.author.firstName}`}
                </section>
                <section className="flex flex-wrap mt-4">
                    {claim.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </section>
            </Card>

            <h2>Messages</h2>

            {/*Need to serialize the data to be able to send it to the client component*/}
            {/*https://github.com/vercel/next.js/discussions/46137#discussioncomment-5047095*/}
            <Messages
                claimId={claim.id}
                messages={JSON.parse(JSON.stringify(claim.messages))}
            />
        </div>
    );
};

type Props = {
    params: Promise<{
        claimId: string;
    }>;
};

const Page: React.FC<Props> = async ({ params }) => {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { claimId } = await params;

    return (
        <div className="flex-auto">
            <Suspense fallback={<LoadingSkeleton />}>
                <Claim claimId={claimId} />
            </Suspense>
        </div>
    );
};

export default Page;
