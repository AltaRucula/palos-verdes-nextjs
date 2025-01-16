'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Tag } from '@/components/Tag';
import { TextArea } from '@/components/TextArea';
import { TAGS } from '@/lib/constants';
import { ClaimFormData } from '@/types/claim';
import React, { useState } from 'react';

type Props = {
    action: (formData: FormData) => void | Promise<void>;
    errors?: string;
    initialValues?: ClaimFormData;
    isPending: boolean;
};

export const ClaimForm: React.FC<Props> = ({ action, errors, initialValues, isPending }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialValues?.tags ?? []);
    const [showModal, setShowModal] = useState(false);

    return (
        <form
            action={action}
            className="flex flex-col"
            onSubmit={() => setShowModal(false)}
        >
            <Input
                defaultValue={initialValues?.title}
                disabled={isPending}
                name="title"
                placeholder="Title"
            />
            <TextArea
                defaultValue={initialValues?.content}
                disabled={isPending}
                name="content"
                placeholder="Type your message"
            />

            <section className="flex flex-wrap mt-4">
                <input
                    name="tags"
                    type="hidden"
                    value={selectedTags}
                />
                {TAGS.map((tag, index) => (
                    <Tag
                        className={`cursor-pointer 
                        hover:bg-secondary-light dark:hover:bg-secondary-dark 
                        ${
                            selectedTags.includes(tag) &&
                            '!bg-highlight-light hover:!bg-highlight-hover-light dark:!bg-highlight-dark dark:hover:!bg-highlight-hover-dark'
                        }`}
                        key={index}
                        onClick={() => {
                            if (isPending) {
                                return;
                            }

                            if (selectedTags.includes(tag)) {
                                setSelectedTags((prevState) => prevState.filter((t) => t !== tag));
                                return;
                            }
                            setSelectedTags((prevState) => [...prevState, tag]);
                        }}
                    >
                        {tag}
                    </Tag>
                ))}
            </section>

            {errors && <p className="text-error-light dark:text-error-dark">{errors}</p>}

            <Button
                disabled={isPending}
                onClick={() => setShowModal(true)}
                type="button"
            >
                {isPending ? 'Working' : 'Save'}
            </Button>

            {/* Have to include the modal in the form so that the YES button from the modal can*/}
            {/* submit the form using the action function from the useActionState hook */}
            <Modal
                title="Claim"
                body="Are you sure you want to save this claim?"
                footer={
                    <div className="flex gap-2 justify-end mt-2">
                        <Button
                            disabled={isPending}
                            onClick={() => setShowModal(false)}
                            type="button"
                        >
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </div>
                }
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </form>
    );
};
