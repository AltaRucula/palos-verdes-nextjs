import React from 'react';

export const ButtonLink = (
    props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
    return (
        <button
            {...{
                ...props,
                className: `py-2 ${props.disabled ? 'cursor-not-allowed opacity-50' : ''} ${props.className}`,
            }}
        />
    );
};
