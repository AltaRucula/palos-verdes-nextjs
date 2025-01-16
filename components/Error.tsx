import React from 'react';

type Props = {
    text?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Error = (props: Props) => {
    return (
        <div
            {...{
                ...props,
                className: `bg-error-dark dark:bg-error-light p-12 rounded-md ${props.className}`,
            }}
        >
            {props.text ?? 'There was an error, please refresh the page'}
        </div>
    );
};
