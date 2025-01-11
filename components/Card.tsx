import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({children, className, title}: Props) => {
    return (
        <div className={`bg-primary-50/50 border-primary-600 border my-6 p-6 rounded-md shadow-lg ${className}`}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}