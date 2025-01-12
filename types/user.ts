export type NewUser = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export type User = {
    id: string;
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}