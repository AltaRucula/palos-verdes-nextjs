import { claimSchema } from '@/schemas/claims';
import { z } from 'zod';

export type Author = {
    id: string;
    firstName: string;
};

export type Claim = {
    id: string;
    createdAt: Date;
    content: string;
    messages: Message[];
    tags: string[];
    title: string;
    author: Author;
    votes: Vote[];
};

export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    author: Author;
};

export type Vote = {
    id: string;
    author: Partial<Author>;
};

export type NewClaim = {
    content: string;
    tags: string[];
    title: string;
    author: string;
};

export type NewMessage = {
    content: string;
    author: string;
};

export type NewVote = {
    author: string;
};

export type ClaimFormFields = z.infer<typeof claimSchema>;
