'use client';

import { editClaim } from '@/app/claims/[claimId]/edit/actions';
import { ClaimForm } from '@/app/claims/ClaimForm';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { ClaimFormData } from '@/types/claim';
import React, { useActionState, useEffect, useState } from 'react';

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
    const [actionPayload, setActionPayload] = useState<FormData | null>(null);

    useEffect(() => {
        if (state.success) {
            setActionPayload(null);
        }
    }, [
        state.success
    ])

    return (
        <div className="flex-auto">
            <h1>Edit Claim</h1>
            <Card>
                <ClaimForm
                    action={(payload: FormData) => {
                        // Store the payload so the modal can execute the action later
                        setActionPayload(payload)
                    }}
                    errors={state.errors}
                    initialValues={state.payload?.claimFormData}
                    isPending={isPending}
                />
            </Card>

            <Modal
                title="Edit this claim"
                body="Are you sure you want to edit this claim? This action cannot be undone."
                footer={(
                    <div className="flex gap-2 justify-end mt-2">
                        <Button
                            disabled={isPending}
                            onClick={() => setActionPayload(null)}>
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            onClick={() => actionPayload && action(actionPayload)}>
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </div>
                )}
                isOpen={!!actionPayload}
                onClose={() => setActionPayload(null)}
            />
        </div>
    );
}