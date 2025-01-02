import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({children, className, title}: Props) => {
    return (
        <div className={`bg-emerald-50/50 border-emerald-600 border my-6 p-6 rounded-md shadow-lg ${className}`}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}