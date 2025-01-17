'use client';

import { submitMessage } from '@/actions/claims';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorField } from '@/components/ErrorField';
import { TextArea } from '@/components/TextArea';
import { messageSchema } from '@/schemas/claims';
import { Message } from '@/types/claims';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns';
import React, { startTransition, useActionState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    claimId: string;
    messages: Message[];
};

export const Messages: React.FC<Props> = ({ claimId, messages }) => {
    const [{ errors: serverErrors, ...state }, action, isPending] = useActionState(submitMessage, {
        claimId: claimId,
        messages: messages,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
        reset,
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(messageSchema),
    });

    useEffect(() => {
        // After sending the message, wait to see if there are errors before erasing the message text area
        if (!isPending && !serverErrors) {
            reset();
        }
    }, [isPending, reset, serverErrors]);

    return (
        <Card>
            <form
                action={action}
                className="flex flex-col"
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit(() => startTransition(async () => action(new FormData(formRef.current!))))(evt);
                }}
                ref={formRef}
            >
                <TextArea
                    {...register('content')}
                    disabled={isPending}
                    error={clientErrors.content?.message as string}
                    placeholder="Type your message"
                />
                <Button
                    disabled={!isValid || isPending}
                    type="submit"
                >
                    {isPending ? 'Working' : 'Send'}
                </Button>

                {serverErrors && <ErrorField>{serverErrors}</ErrorField>}
            </form>

            <div className="mt-8">
                {state.messages?.length === 0 && <p className="mt-12">No messages yet</p>}

                {state.messages?.map((message, index) => (
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
