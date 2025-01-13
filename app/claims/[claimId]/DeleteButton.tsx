'use client';

import { deleteClaim } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import React, { useActionState, useEffect, useState } from 'react';

type Props = {
    claimId: string;
    userId: string;
}

export const DeleteButton: React.FC<Props> = ({claimId, userId}) => {
    const [state, action, isPending] = useActionState(deleteClaim, {
        success: false,
        payload: {
            claimId,
            userId
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (state.success) {
            setIsModalOpen(false);
        }
    }, [
        state.success
    ])

    return (
        <div>
            <Modal
                title="Delete this claim"
                body="Are you sure you want to delete this claim? This action cannot be undone."
                footer={(
                    <form action={action} className="flex gap-2 justify-end mt-2">
                        <Button
                            disabled={isPending}
                            onClick={() => setIsModalOpen(false)}>
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit">
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </form>
                )}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <Button
                disabled={isPending}
                type="submit"
                onClick={() => setIsModalOpen(true)}>
                {isPending ? 'Working' : 'Delete'}
            </Button>

        </div>
    )
}