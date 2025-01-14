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

export type ProfileEditFormData = {
    email: string;
    firstName: string;
    lastName: string;
}

export type ChangePasswordFormData = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}