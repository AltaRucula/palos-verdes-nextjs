import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export const TextArea = (props: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    return (
        <textarea
            {...{
                ...props,
                className: `border-primary-600 border mx-auto p-4 min-w-full rounded-md resize-none ${props.className}`
            }}
            rows={3}/>
    )
}