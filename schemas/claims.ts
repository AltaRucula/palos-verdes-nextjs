import { z } from 'zod';

export const claimSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
});

export const messageSchema = z.object({
    content: z.string().min(1, 'Content is required'),
});
