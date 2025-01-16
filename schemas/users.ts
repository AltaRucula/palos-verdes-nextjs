import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
});

export const profileSchema = z.object({
    email: z.string().email('Email is invalid'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
});

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z.string().min(1, 'New password is required'),
        newPasswordConfirmation: z.string().min(1, 'New password confirmation is required'),
    })
    .refine((schema) => schema.newPassword === schema.newPasswordConfirmation, {
        message: 'Passwords do not match',
        path: ['newPasswordConfirmation'],
    });

export const signupSchema = z.object({
    email: z.string().email('Email is invalid'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(1, 'Password is required'),
});
