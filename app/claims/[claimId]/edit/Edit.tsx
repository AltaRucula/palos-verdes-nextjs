'use client';

import { editClaim } from '@/app/claims/[claimId]/edit/actions';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Card } from '@/components/Card';
import { ClaimFormData } from '@/types/claim';
import React, { useActionState } from 'react';

type Props = {
    claimAuthorId: string;
    claimId: string;
    formData: ClaimFormData;
}

export const Edit: React.FC<Props> = ({claimAuthorId, claimId, formData}) => {
    const [state, action, isPending] = useActionState(editClaim, {
        success: false,
        payload: {
            claimAuthorId,
            formData,
            claimId
        }
    });

    return (
        <div className="flex-auto">
            <h1>Edit Claim</h1>
            <Card>
                <ClaimForm
                    action={action}
                    errors={state.errors}
                    initialValues={state.payload?.formData}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
}