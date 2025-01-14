import React from 'react';

export const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...{
            ...props,
            className: `hover:bg-secondary rounded-md my-2 py-2 px-8 ${props.disabled ? 'cursor-not-allowed' +
                ' opacity-50' : ''} ${props.className}`
        }}/>
    )
}