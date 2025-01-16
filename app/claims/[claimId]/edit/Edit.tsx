'use client';

import { editClaim } from '@/actions/claims';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Card } from '@/components/Card';
import { ClaimFormData } from '@/types/claims';
import React, { useActionState } from 'react';

type Props = {
    claimAuthorId: string;
    claimId: string;
    initialValues: ClaimFormData;
};

export const Edit: React.FC<Props> = ({ claimAuthorId, claimId, initialValues }) => {
    const [state, action, isPending] = useActionState(editClaim, {
        claimAuthorId,
        initialValues: initialValues,
        claimId,
    });

    return (
        <div className="flex-auto">
            <h1>Edit Claim</h1>
            <Card>
                <ClaimForm
                    action={action}
                    serverErrors={state.errors}
                    initialValues={state.initialValues}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
};
