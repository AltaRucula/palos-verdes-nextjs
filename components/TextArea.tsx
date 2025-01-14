import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export const TextArea = (props: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    return (
        <textarea
            {...{
                ...props,
                className: `bg-secondary border-0 mx-auto p-4 min-w-full rounded-md resize-none ${props.className}`
            }}
            rows={3}/>
    )
}