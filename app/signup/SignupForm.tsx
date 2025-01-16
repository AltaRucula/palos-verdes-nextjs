'use client';

import { signup } from '@/app/signup/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { useActionState } from 'react';

export const SignupForm = () => {
    const [state, action, isPending] = useActionState(signup, {
        success: false,
    });

    return (
        <form
            action={action}
            className="flex flex-col items-center p-10"
        >
            <Input
                defaultValue={state.payload?.savedFormData.firstName}
                disabled={isPending}
                name="firstName"
                type="text"
                placeholder="First name"
                size={30}
            />
            <Input
                defaultValue={state.payload?.savedFormData.lastName}
                disabled={isPending}
                name="lastName"
                type="text"
                placeholder="Last name"
                size={30}
            />
            <Input
                defaultValue={state.payload?.savedFormData.email}
                disabled={isPending}
                name="email"
                type="text"
                placeholder="Email"
                size={30}
            />
            <Input
                disabled={isPending}
                name="password"
                type="password"
                placeholder="Password"
                size={30}
            />

            {state.errors && <p className="text-error-light dark:text-error-dark">{state.errors}</p>}

            <Button
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Working' : 'Signup'}
            </Button>

            <p className="mt-6">
                Already have an account?{' '}
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </p>
        </form>
    );
};
