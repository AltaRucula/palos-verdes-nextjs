import React from 'react';

export const ForbiddenError = (
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
    return (
        <div
            {...{
                ...props,
                className: `bg-error-dark dark:bg-error-light p-12 rounded-md ${props.className}`,
            }}
        >
            You need to be logged in to access certain functionalities of this site
        </div>
    );
};
