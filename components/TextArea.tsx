import { ErrorField } from '@/components/ErrorField';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type Props = {
    error?: string;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const TextArea = (props: Props) => {
    return (
        <div>
            <textarea
                {...{
                    ...props,
                    className: `bg-secondary-light dark:bg-secondary-dark border-0 mx-auto p-4 min-w-full rounded-md resize-none ${props.className}`,
                }}
                rows={3}
            />
            {props.error && <ErrorField>{props.error}</ErrorField>}
        </div>
    );
};
