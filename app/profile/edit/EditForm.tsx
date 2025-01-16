'use client';

import { editProfile } from '@/actions/users';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { profileSchema } from '@/schemas/users';
import { ProfileFormFields } from '@/types/users';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FormEvent, startTransition, useActionState, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    initialValues: ProfileFormFields;
    userId: string;
};

export const EditForm: React.FC<Props> = ({ initialValues, userId }) => {
    const [{ errors: serverErrors }, action, isPending] = useActionState(editProfile, {
        userId,
    });

    const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement> | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        defaultValues: initialValues,
        mode: 'onTouched',
        resolver: zodResolver(profileSchema),
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
                        {...register('firstName')}
                        disabled={isPending}
                        error={clientErrors.firstName?.message as string}
                        placeholder="First name"
                        size={30}
                        type="text"
                    />
                    <Input
                        {...register('lastName')}
                        disabled={isPending}
                        error={clientErrors.lastName?.message as string}
                        placeholder="Last name"
                        size={30}
                        type="text"
                    />
                    <Input
                        {...register('email')}
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

                    {serverErrors && <ErrorField>{serverErrors}</ErrorField>}
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
