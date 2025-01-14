import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({children, className, title}: Props) => {
    return (
        <div className={`bg-primary my-6 p-8 rounded-md  ${className}`}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}