import { profileSchema } from '@/schemas/users';
import { z } from 'zod';

export type User = {
    id: string;
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type ProfileFormFields = z.infer<typeof profileSchema>;
