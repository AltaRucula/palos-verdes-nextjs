"use client";

import { submitMessage } from '@/app/claims/[claimId]/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextArea } from '@/components/TextArea';
import { Message } from '@/types/claim';
import { formatDistanceToNow } from 'date-fns';
import { useActionState, useEffect, useState } from 'react';

type Props = {
    claimId: string;
    messages: Message[];
}

export const Messages = (props: Props) => {
    const [state, action, isPending] = useActionState(submitMessage, {
        success: false
    });
    const [messages, setMessages] = useState(props.messages);

    useEffect(() => {
        if (state.payload) {
            setMessages(state.payload);
        }
    }, [
        state.payload
    ])

    return (
        <Card>
            <form action={action} className="flex flex-col">
                <input name="claimId" type="hidden" value={props.claimId}/>
                <TextArea name="message" placeholder="Type your message"/>
                <Button disabled={isPending} type="submit">Send</Button>
            </form>

            <div className="mt-8">
                {messages.map((message, index) => (
                    <div
                        className="border-t border-dotted border-emerald-600 py-4"
                        key={index}>
                        {message.content}
                        <div className="text-gray-400">{formatDistanceToNow(message.createdAt, {
                            addSuffix: true
                        })}</div>
                    </div>
                ))}
            </div>
        </Card>
    )
}