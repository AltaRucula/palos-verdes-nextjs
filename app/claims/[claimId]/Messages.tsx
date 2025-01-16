'use client';

import { submitMessage } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextArea } from '@/components/TextArea';
import { Message } from '@/types/claim';
import { formatDistanceToNow } from 'date-fns';
import React, { useActionState } from 'react';

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

    return (
        <Card>
            <form
                action={action}
                className=" flex flex-col"
            >
                <TextArea
                    disabled={isPending}
                    name="message"
                    placeholder="Type your message"
                />
                <Button
                    // className="min-w-72"
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? 'Working' : 'Send'}
                </Button>
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

                {state.errors && <p className="text-error-light dark:text-error-dark">{state.errors}</p>}
            </div>
        </Card>
    );
};
