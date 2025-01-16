'use client';

import { changePassword } from '@/app/profile/password/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import React, { FormEvent, startTransition, useActionState, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    userId: string;
};

export const ChangePasswordForm: React.FC<Props> = ({ userId }) => {
    const [state, action, isPending] = useActionState(changePassword, {
        success: false,
        payload: {
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
            <h1>Change Password</h1>
            <Card>
                <form
                    action={action}
                    className="flex flex-col items-center p-10"
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        setFormEvent(evt);
                    }}
                    ref={formRef}
                >
                    <Input
                        {...register('currentPassword', {
                            required: 'Current password is required',
                        })}
                        disabled={isPending}
                        error={clientErrors.currentPassword?.message as string}
                        placeholder="Current Password"
                        size={30}
                        type="password"
                    />
                    <Input
                        {...register('newPassword', {
                            required: 'New password is required',
                        })}
                        disabled={isPending}
                        error={clientErrors.newPassword?.message as string}
                        placeholder="New Password"
                        size={30}
                        type="password"
                    />
                    <Input
                        {...register('newPasswordConfirmation', {
                            required: 'New password confirmation is required',
                        })}
                        disabled={isPending}
                        error={clientErrors.newPasswordConfirmation?.message as string}
                        placeholder="Confirm New Password"
                        size={30}
                        type="password"
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
                title="Password"
                body="Are you sure you want to change the password?"
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
