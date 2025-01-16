import { ErrorField } from '@/components/ErrorField';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
    error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: Props) => {
    return (
        <div>
            <input
                {...{
                    ...props,
                    className: `bg-secondary-light dark:bg-secondary-dark border-0 rounded-md py-2 px-4 my-2 ${props.className}`,
                }}
            />
            {props.error && <ErrorField>{props.error}</ErrorField>}
        </div>
    );
};
