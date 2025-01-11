import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const Input = (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input {...{
            ...props,
            className: `border border-primary-600 rounded-md py-2 px-4 my-2 ${props.className}`
        }} />
    )
}