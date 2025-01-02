import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
}

export const Tag = ({children, className}: Props) => {
    return (
        <div className={`bg-emerald-700 text-emerald-200 rounded-md py-2 px-6 mb-4 mr-2 ${className}`}>{children}</div>
    )
}