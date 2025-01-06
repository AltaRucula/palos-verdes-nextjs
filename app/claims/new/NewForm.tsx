'use client';

import { createClaim } from '@/app/claims/new/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tag } from '@/components/Tag';
import { TextArea } from '@/components/TextArea';
import { TAGS } from '@/lib/constants';
import { useActionState, useState } from 'react';

export const NewForm = () => {
    const [state, action, isPending] = useActionState(createClaim, {
        success: false
    });
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <form action={action} className="flex flex-col">
            <Input name="title" placeholder="Title"/>
            <TextArea name="content" placeholder="Type your message"/>

            <section className="flex flex-wrap mt-4">
                <input name="tags" type="hidden" value={selectedTags}/>
                {TAGS.map((tag, index) => (
                    <Tag className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-emerald-900 font-bold' : ''}`}
                         key={index}
                         onClick={() => {
                             if (selectedTags.includes(tag)) {
                                 setSelectedTags((prevState => prevState.filter(t => t !== tag)));
                                 return;
                             }
                             setSelectedTags((prevState => [...prevState, tag]))
                         }}>{tag}</Tag>
                ))}
            </section>

            {state.errors && <p className="text-red-500">{state.errors}</p>}
            <Button disabled={isPending} type="submit">{isPending ? 'Working' : 'Create'}</Button>
        </form>
    );
}