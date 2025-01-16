import { claimSchema } from '@/schemas/claims';
import { Users } from '@/types/users';
import { z } from 'zod';

export type Claims = {
    id: string;
    createdAt: Date;
    content: string;
    messages: Message[];
    tags: string[];
    title: string;
    author: Users;
    votes: Vote[];
};

export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    author: Users;
};

export type Vote = {
    id: string;
    createdAt: Date;
    author: Users;
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
