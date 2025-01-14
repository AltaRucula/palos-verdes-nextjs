import React from 'react';

interface Props {
    title: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<Props> = ({title, body, footer, isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10"
            role="dialog"
        >
            <div className="bg-tertiary rounded-md max-w-md w-full">
                <div className="bg-secondary flex justify-between items-center px-6 py-4 ">
                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="px-6 py-6 ">
                    {body}
                </div>
                <div className="border-t border-secondary px-6 py-2 ">
                    {footer}
                </div>
            </div>
        </div>
    );
};
