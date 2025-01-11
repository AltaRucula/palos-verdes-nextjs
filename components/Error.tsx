import React from "react";

type Props = {
    text?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Error = (props: Props) => {
    return <div {...{
        ...props,
        className: `bg-red-500 text-white p-12 rounded-md ${props.className}`
    }}>
        {props.text ?? 'There was an error, please refresh the page'}
    </div>;
};