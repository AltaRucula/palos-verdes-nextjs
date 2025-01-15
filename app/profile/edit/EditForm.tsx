'use client';

import { editProfile } from '@/app/profile/edit/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ProfileEditFormData } from '@/types/user';
import React, { useActionState, useState } from 'react';

type Props = {
    formData: ProfileEditFormData;
    userId: string;
}

export const EditForm: React.FC<Props> = ({formData, userId}) => {
    const [state, action, isPending] = useActionState(editProfile, {
        success: false,
        payload: {
            savedFormData: formData,
            userId
        }
    });
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex-auto">
            <h1>Edit Profile</h1>
            <Card>
                <form
                    action={action}
                    className="flex flex-col items-center p-8"
                    onSubmit={() => setShowModal(false)}
                >
                    <Input
                        defaultValue={state.payload?.savedFormData.firstName}
                        disabled={isPending}
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        size={30}
                    />
                    <Input
                        defaultValue={state.payload?.savedFormData.lastName}
                        disabled={isPending}
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        size={30}
                    />
                    <Input
                        defaultValue={state.payload?.savedFormData.email}
                        disabled={isPending}
                        name="email"
                        type="text"
                        placeholder="Email"
                        size={30}
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
                        title="Profile"
                        body="Are you sure you want to save this data?"
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