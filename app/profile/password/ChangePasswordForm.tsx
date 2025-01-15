'use client';

import { changePassword } from '@/app/profile/password/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import React, { useActionState, useState } from 'react';

type Props = {
    userId: string;
}

export const ChangePasswordForm: React.FC<Props> = ({userId}) => {
    const [state, action, isPending] = useActionState(changePassword, {
        success: false,
        payload: {
            userId
        }
    });
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex-auto">
            <h1>Change Password</h1>
            <Card>
                <form
                    action={action}
                    className="flex flex-col items-center p-10"
                    onSubmit={() => setShowModal(false)}
                >
                    <Input
                        disabled={isPending} name="currentPassword"
                        placeholder="Current Password"
                        size={30}
                        type="password"
                    />
                    <Input
                        disabled={isPending}
                        name="newPassword"
                        placeholder="New Password"
                        size={30}
                        type="password"
                    />
                    <Input
                        disabled={isPending}
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        size={30}
                        type="password"
                    />

                    {state.errors && <p className="text-error-light dark:text-error-dark">{state.errors}</p>}

                    <Button
                        disabled={isPending}
                        onClick={() => setShowModal(true)}
                        type="button"
                    >
                        {isPending ? 'Working' : 'Save'}
                    </Button>

                    {/* Have to include the modal in the form so that the YES button from the modal can*/}
                    {/* submit the form using the action function from the useActionState hook */}
                    <Modal
                        title="Claim"
                        body="Are you sure you want to save this claim?"
                        footer={(
                            <div className="flex gap-2 justify-end mt-2">
                                <Button
                                    disabled={isPending}
                                    onClick={() => setShowModal(false)}
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
                            </div>
                        )}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    />
                </form>
            </Card>
        </div>
    );
}