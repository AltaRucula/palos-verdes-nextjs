'use client';

import { deleteClaim } from '@/actions/claims';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import { Modal } from '@/components/Modal';
import React, { useActionState, useState } from 'react';

type Props = {
    claimId: string;
    userId: string;
};

export const DeleteButton: React.FC<Props> = ({ claimId, userId }) => {
    const [state, action, isPending] = useActionState(deleteClaim, {
        claimId,
        userId,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button
                disabled={isPending}
                onClick={() => setIsModalOpen(true)}
                type="button"
            >
                {isPending ? 'Working' : 'Delete'}
            </Button>

            {state.errors && <ErrorField>{state.errors}</ErrorField>}

            <Modal
                title="Delete this claim"
                body="Are you sure you want to delete this claim? This action cannot be undone."
                footer={
                    <form
                        action={action}
                        className="flex gap-2 justify-end mt-2"
                    >
                        <Button
                            disabled={isPending}
                            onClick={() => setIsModalOpen(false)}
                            type="button"
                        >
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </form>
                }
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
