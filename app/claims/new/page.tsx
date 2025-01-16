'use client';

import { ClaimForm } from '@/app/claims/ClaimForm';
import { createClaim } from '@/app/claims/new/actions';
import { Card } from '@/components/Card';
import { useActionState } from 'react';

const Page = () => {
    const [state, action, isPending] = useActionState(createClaim, {
        success: false,
    });

    return (
        <div className="flex-auto">
            <h1>New Claim</h1>
            <Card>
                <ClaimForm
                    action={action}
                    errors={state.errors}
                    initialValues={state.payload?.savedFormData}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
};

export default Page;
