'use client';

import { editProfile } from '@/app/profile/edit/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ProfileEditFormData } from '@/types/user';
import React, { useActionState, useEffect, useState } from 'react';

type Props = {
    formData: ProfileEditFormData;
    userId: string;
}

export const EditForm: React.FC<Props> = ({formData, userId}) => {
    const [state, action, isPending] = useActionState(editProfile, {
        success: false,
        payload: {
            formData: formData,
            userId
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
            <h1>Edit Profile</h1>
            <Card>
                <form
                    action={action}
                    // action={(payload: FormData) => {
                    //     // Store the payload so the modal can execute the action later
                    //     setActionPayload(payload)
                    // }}
                    className="flex flex-col items-center p-8">
                    <Input
                        defaultValue={state.payload?.formData.firstName}
                        disabled={isPending}
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        size={30}
                    />
                    <Input
                        defaultValue={state.payload?.formData.lastName}
                        disabled={isPending}
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        size={30}
                    />
                    <Input
                        defaultValue={state.payload?.formData.email}
                        disabled={isPending}
                        name="email"
                        type="text"
                        placeholder="Email"
                        size={30}
                    />
                    {state.errors && <p className="text-error-light dark:text-error-dark">{state.errors}</p>}
                    <Button
                        disabled={isPending}
                        type="submit">
                        {isPending ? 'Working' : 'Save'}
                    </Button>
                </form>
            </Card>

            <Modal
                title="Profile Edit"
                body="Are you sure you want to edit your data? This action cannot be undone."
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