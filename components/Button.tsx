import React from 'react';

export const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...{
            ...props,
            className: `bg-emerald-700 text-emerald-100 rounded-md mt-2 py-2 px-8 ${props.disabled ? 'cursor-progress opacity-50' : ''}`
        }}/>
    )
}