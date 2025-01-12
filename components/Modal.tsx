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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
            role="dialog"
        >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="mt-2">
                    {body}
                </div>
                <div className="border-t border-secondary-200 mt-6">
                    {footer}
                </div>
            </div>
        </div>
    );
};
