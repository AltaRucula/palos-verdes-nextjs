import { Users } from '@/types/users';

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

export type ClaimFormData = {
    title: string;
    content: string;
    tags: string[];
};
