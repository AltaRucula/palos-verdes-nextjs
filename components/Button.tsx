import React from 'react';

export const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...{
            ...props,
            className: `bg-primary-700 text-primary-100 rounded-md mt-2 py-2 px-8 ${props.disabled ? 'cursor-not-allowed' +
                ' opacity-50' : ''} ${props.className}`
        }}/>
    )
}