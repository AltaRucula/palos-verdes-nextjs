export type NewUser = {
    email: string;
    password: string;
}

export type User = {
    _id: string;
    createdAt: Date;
    email: string;
    password: string;
}