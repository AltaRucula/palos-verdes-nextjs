'use client';

import { submitMessage } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorField } from '@/components/ErrorField';
import { TextArea } from '@/components/TextArea';
import { Message } from '@/types/claim';
import { formatDistanceToNow } from 'date-fns';
import React, { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    claimId: string;
    messages: Message[];
};

export const Messages: React.FC<Props> = ({ claimId, messages }) => {
    const [state, action, isPending] = useActionState(submitMessage, {
        success: false,
        payload: {
            claimId: claimId,
            messages: messages,
        },
    });

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        mode: 'onTouched',
    });

    return (
        <Card>
            <form
                action={action}
                className="flex flex-col"
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit(() => startTransition(() => action(new FormData(formRef.current!))))(evt);
                }}
                ref={formRef}
            >
                <TextArea
                    {...register('message', {
                        required: 'Message is required',
                    })}
                    disabled={isPending}
                    error={clientErrors.message?.message as string}
                    placeholder="Type your message"
                />
                <Button
                    disabled={!isValid || isPending}
                    type="submit"
                >
                    {isPending ? 'Working' : 'Send'}
                </Button>

                {state.errors && <ErrorField>{state.errors}</ErrorField>}
            </form>

            <div className="mt-8">
                {state.payload?.messages?.length === 0 && <p className="mt-12">No messages yet</p>}

                {state.payload?.messages?.map((message, index) => (
                    <div
                        className="border-t border-dotted border-tertiary-light dark:border-tertiary-dark py-4"
                        key={index}
                    >
                        {message.content}
                        <div className="text-xs">
                            {`Created ${formatDistanceToNow(message.createdAt, { addSuffix: true })} by ${message.author.firstName}`}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
