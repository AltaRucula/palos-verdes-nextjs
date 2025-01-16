'use client';

import { editClaim } from '@/actions/claims';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Card } from '@/components/Card';
import { ClaimFormFields } from '@/types/claims';
import React, { useActionState } from 'react';

type Props = {
    claimAuthorId: string;
    claimId: string;
    initialValues: ClaimFormFields;
};

export const Edit: React.FC<Props> = ({ claimAuthorId, claimId, initialValues }) => {
    const [{ errors: serverErrors }, action, isPending] = useActionState(editClaim, {
        claimAuthorId,
        claimId,
    });

    return (
        <div className="flex-auto">
            <h1>Edit Claim</h1>
            <Card>
                <ClaimForm
                    action={action}
                    serverErrors={serverErrors}
                    initialValues={initialValues}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
};
