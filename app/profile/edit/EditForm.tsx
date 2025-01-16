'use client';

import { editProfile } from '@/app/profile/edit/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ProfileEditFormData } from '@/types/user';
import React, { FormEvent, startTransition, useActionState, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    formData: ProfileEditFormData;
    userId: string;
};

export const EditForm: React.FC<Props> = ({ formData, userId }) => {
    const [state, action, isPending] = useActionState(editProfile, {
        success: false,
        payload: {
            savedFormData: formData,
            userId,
        },
    });

    const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement> | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        mode: 'onTouched',
    });

    return (
        <div className="flex-auto">
            <h1>Edit Profile</h1>
            <Card>
                <form
                    action={action}
                    className="flex flex-col items-center p-8"
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        setFormEvent(evt);
                    }}
                    ref={formRef}
                >
                    <Input
                        {...register('firstName', {
                            required: 'First name is required',
                        })}
                        defaultValue={state.payload?.savedFormData.firstName}
                        disabled={isPending}
                        error={clientErrors.firstName?.message as string}
                        placeholder="First name"
                        size={30}
                        type="text"
                    />
                    <Input
                        {...register('lastName', {
                            required: 'Last name is required',
                        })}
                        defaultValue={state.payload?.savedFormData.lastName}
                        disabled={isPending}
                        error={clientErrors.lastName?.message as string}
                        placeholder="Last name"
                        size={30}
                        type="text"
                    />
                    <Input
                        {...register('email', {
                            required: 'Email is required',
                        })}
                        defaultValue={state.payload?.savedFormData.email}
                        disabled={isPending}
                        error={clientErrors.email?.message as string}
                        placeholder="Email"
                        size={30}
                        type="text"
                    />

                    <Button
                        disabled={!isValid || isPending}
                        type="submit"
                    >
                        {isPending ? 'Working' : 'Save'}
                    </Button>

                    {state.errors && <ErrorField>{state.errors}</ErrorField>}
                </form>
            </Card>

            <Modal
                title="Profile"
                body="Are you sure you want to save this data?"
                footer={
                    <div className="flex gap-2 justify-end mt-2">
                        <Button
                            disabled={isPending}
                            onClick={() => setFormEvent(null)}
                            type="button"
                        >
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            onClick={() =>
                                formEvent &&
                                handleSubmit(() => {
                                    setFormEvent(null);
                                    startTransition(() => action(new FormData(formRef.current!)));
                                })(formEvent)
                            }
                            type="button"
                        >
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </div>
                }
                isOpen={!!formEvent}
                onClose={() => setFormEvent(null)}
            />
        </div>
    );
};
