import { User } from '@/types/user';

export type Claim = {
    id: string;
    createdAt: Date;
    content: string;
    messages: Message[];
    tags: string[];
    title: string;
    author: User;
    votes: Vote[];
};

export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    author: User;
};

export type Vote = {
    id: string;
    createdAt: Date;
    author: User;
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
