export type NewUser = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type Users = {
    id: string;
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type ProfileEditFormData = {
    email: string;
    firstName: string;
    lastName: string;
};
