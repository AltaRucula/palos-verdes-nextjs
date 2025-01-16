'use client';

import { createClaim } from '@/actions/claims';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Card } from '@/components/Card';
import { useActionState } from 'react';

const Page = () => {
    const [{ errors: serverErrors }, action, isPending] = useActionState(createClaim, {});

    return (
        <div className="flex-auto">
            <h1>New Claim</h1>
            <Card>
                <ClaimForm
                    action={action}
                    serverErrors={serverErrors}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
};

export default Page;
