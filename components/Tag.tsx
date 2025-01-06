import React from 'react';

export const Tag = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div {...{
            ...props,
            className: `bg-emerald-700 text-emerald-200 rounded-md py-2 px-6 mb-4 mr-2 ${props.className}`
        }} />
    )
}