export type Message = {
    _id: string;
    content: string;
    createdAt: Date;
}

export type Claim = {
    _id: string;
    author: string;
    createdAt: Date;
    content: string;
    tags: string[];
    title: string;
    votes: number;
    messages: Message[]
}