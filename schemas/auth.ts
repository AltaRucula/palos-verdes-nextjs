import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
    email: z.string().email('Email is invalid'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(1, 'Password is required'),
});
