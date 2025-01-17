import { ZodError } from 'zod';

export const getErrors = (e: ZodError | unknown): string | string[] =>
    e instanceof ZodError ? e.issues.map((issue) => issue.message) : 'Unexpected exception parsing schema';
