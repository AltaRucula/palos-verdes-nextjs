export type Message = {
    _id: string;
    content: string;
    createdAt: Date;
}

export type Claim = {
    _id: string;
    createdAt: Date;
    content: string;
    messages: Message[]
    tags: string[];
    title: string;
    userId: string;
    votes: number;
}

export type NewClaim = {
    content: string;
    tags: string[];
    title: string;
    userId: string;
}