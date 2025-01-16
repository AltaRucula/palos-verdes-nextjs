import React from 'react';

export const ErrorField = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div
            {...{
                ...props,
                className: `text-error-light dark:text-error-dark p-2 rounded-md text-sm ${props.className}`,
            }}
        />
    );
};
