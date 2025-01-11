"use client";

import { submitMessage } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextArea } from '@/components/TextArea';
import { Message } from '@/types/claim';
import { formatDistanceToNow } from 'date-fns';
import { useActionState } from 'react';

type Props = {
    claimId: string;
    messages: Message[];
}

export const Messages = (props: Props) => {
    const [state, action, isPending] = useActionState(submitMessage, {
        success: false,
        payload: {
            claimId: props.claimId,
            messages: props.messages
        }
    });

    return (
        <Card>
            <form action={action} className="flex flex-col">
                <TextArea name="message" placeholder="Type your message"/>
                <Button disabled={isPending} type="submit">{isPending ? 'Working' : 'Send'}</Button>
            </form>

            <div className="mt-8">
                {state.payload?.messages?.length === 0 && <p className="mt-12">No messages yet</p>}

                {state.payload?.messages?.map((message, index) => (
                    <div
                        className="border-t border-dotted border-primary-600 py-4"
                        key={index}>
                        {message.content}
                        <div className="text-secondary-400">{formatDistanceToNow(message.createdAt, {
                            addSuffix: true
                        })}</div>
                    </div>
                ))}

                {state.errors && <p className="text-red-500">{state.errors}</p>}
            </div>
        </Card>
    )
}