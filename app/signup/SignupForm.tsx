'use client';

import { signup } from '@/actions/users';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { signupSchema } from '@/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export const SignupForm = () => {
    const [{ errors: serverErrors }, action, isPending] = useActionState(signup, {});

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(signupSchema),
    });

    return (
        <form
            action={action}
            className="flex flex-col items-center p-10"
            onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(() => {
                    startTransition(() => action(new FormData(formRef.current!)));
                })(evt);
            }}
            ref={formRef}
        >
            <Input
                {...register('firstName')}
                disabled={isPending}
                error={clientErrors.firstName?.message as string}
                placeholder="First name"
                type="text"
                size={30}
            />
            <Input
                {...register('lastName')}
                disabled={isPending}
                error={clientErrors.lastName?.message as string}
                placeholder="Last name"
                type="text"
                size={30}
            />
            <Input
                {...register('email')}
                disabled={isPending}
                error={clientErrors.email?.message as string}
                placeholder="Email"
                type="text"
                size={30}
            />
            <Input
                {...register('password')}
                disabled={isPending}
                error={clientErrors.password?.message as string}
                placeholder="Password"
                type="password"
                size={30}
            />

            <Button
                disabled={!isValid || isPending}
                type="submit"
            >
                {isPending ? 'Working' : 'Signup'}
            </Button>

            {serverErrors && <ErrorField>{serverErrors}</ErrorField>}

            <p className="mt-6">
                Already have an account?{' '}
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </p>
        </form>
    );
};
