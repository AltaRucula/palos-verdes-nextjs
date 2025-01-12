import React from 'react';

export const Tag = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div {...{
            ...props,
            className: `bg-primary-700 text-primary-200 text-sm rounded-md py-1 px-2 mb-4 mr-2 ${props.className}`
        }} />
    )
}