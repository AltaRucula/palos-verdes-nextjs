'use client';

import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Tag } from '@/components/Tag';
import { TextArea } from '@/components/TextArea';
import { TAGS } from '@/lib/constants';
import { ClaimFormData } from '@/types/claims';
import React, { FormEvent, startTransition, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    action: (formData: FormData) => void | Promise<void>;
    serverErrors?: string;
    initialValues?: ClaimFormData;
    isPending: boolean;
};

export const ClaimForm: React.FC<Props> = ({ action, serverErrors, initialValues, isPending }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialValues?.tags ?? []);

    const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement> | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        defaultValues: initialValues,
        mode: 'onTouched',
    });

    return (
        <div>
            <form
                action={action}
                className="flex flex-col"
                onSubmit={(evt) => {
                    evt.preventDefault();
                    setFormEvent(evt);
                }}
                ref={formRef}
            >
                <Input
                    {...register('title', {
                        required: 'Title is required',
                    })}
                    disabled={isPending}
                    error={clientErrors.title?.message as string}
                    placeholder="Title"
                    size={60}
                    type="text"
                />
                <TextArea
                    {...register('content', {
                        required: 'Content is required',
                    })}
                    disabled={isPending}
                    error={clientErrors.content?.message as string}
                    placeholder="Type your message"
                />

                <section className="flex flex-wrap mt-4">
                    <input
                        {...register('tags', {
                            minLength: {
                                value: 1,
                                message: 'At least one tag is required',
                            },
                        })}
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
                    {clientErrors.tags?.message && <ErrorField>{clientErrors.tags?.message as string}</ErrorField>}
                </section>

                <Button
                    disabled={!isValid || isPending}
                    type="submit"
                >
                    {isPending ? 'Working' : 'Save'}
                </Button>

                {serverErrors && <ErrorField>{serverErrors}</ErrorField>}
            </form>

            <Modal
                title="Claim"
                body="Are you sure you want to save this claim?"
                footer={
                    <div className="flex gap-2 justify-end mt-2">
                        <Button
                            disabled={isPending}
                            onClick={() => setFormEvent(null)}
                            type="button"
                        >
                            {isPending ? 'Working' : 'No'}
                        </Button>
                        <Button
                            disabled={isPending}
                            onClick={() =>
                                formEvent &&
                                handleSubmit(() => {
                                    setFormEvent(null);
                                    startTransition(() => action(new FormData(formRef.current!)));
                                })(formEvent)
                            }
                            type="button"
                        >
                            {isPending ? 'Working' : 'Yes'}
                        </Button>
                    </div>
                }
                isOpen={!!formEvent}
                onClose={() => setFormEvent(null)}
            />
        </div>
    );
};
