import { Edit } from '@/app/claims/[claimId]/edit/Edit';
import { LoadingSkeleton } from '@/app/claims/[claimId]/edit/LoadingSkeleton';
import { ForbiddenError } from '@/components/ForbiddenError';
import { findClaim } from '@/lib/claims';
import { getCookieSession } from '@/lib/session';
import React, { Suspense } from 'react';

type ClaimProps = {
    claimId: string;
};

const Claim: React.FC<ClaimProps> = async ({ claimId }) => {
    const claim = await findClaim(claimId);
    if (!claim) {
        return <ForbiddenError />;
    }

    const currentSession = await getCookieSession();
    const currentSessionUserId = currentSession?.userId as string;
    const isClaimOwnedByUser = claim.author.id === currentSessionUserId;

    if (!isClaimOwnedByUser) {
        return (
            <div>
                <ForbiddenError text="You do not have permission to edit this claim" />
            </div>
        );
    }

    return (
        <Edit
            claimAuthorId={claim.author.id}
            initialValues={{
                title: claim.title,
                content: claim.content,
                tags: claim.tags,
            }}
            claimId={claim.id}
        />
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
