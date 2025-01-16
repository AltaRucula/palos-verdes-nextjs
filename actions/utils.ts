import { ZodError } from 'zod';

export const getClaimFormData = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rawTags = formData.get('tags') as string;
    const tags = rawTags.length > 0 ? rawTags.split(',') : [];

    return {
        title,
        content,
        tags,
    };
};

export const getErrors = (e: ZodError | unknown): string | string[] =>
    e instanceof ZodError ? e.issues.map((issue) => issue.message) : 'Unexpected exception parsing schema';
