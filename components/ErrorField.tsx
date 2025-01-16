import React from 'react';

type Props = {
    children: React.ReactNode | React.ReactNode[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ErrorField = (props: Props) => {
    return (
        <div
            {...{
                ...props,
                className: `text-error-light dark:text-error-dark p-2 rounded-md text-sm ${props.className}`,
            }}
        >
            {props.children instanceof Array
                ? props.children.map((error, index) => <p key={index}>{error}</p>)
                : props.children}
        </div>
    );
};
