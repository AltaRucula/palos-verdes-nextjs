'use client';

import { editClaim } from '@/app/claims/[claimId]/edit/actions';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Card } from '@/components/Card';
import { ClaimFormData } from '@/types/claim';
import React, { useActionState } from 'react';

type Props = {
    claimAuthorId: string;
    claimFormData: ClaimFormData;
    claimId: string;
}

export const EditForm: React.FC<Props> = ({claimAuthorId, claimFormData, claimId}) => {
    const [state, action, isPending] = useActionState(editClaim, {
        success: false,
        payload: {
            claimAuthorId,
            claimFormData,
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
                    initialValues={state.payload?.claimFormData}
                    isPending={isPending}
                />
            </Card>
        </div>
    );
}