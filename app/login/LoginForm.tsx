'use client';

import { login } from '@/actions/users';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import { loginSchema } from '@/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
    const [{ errors: serverErrors }, action, isPending] = useActionState(login, {});

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
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
                {...register('email')}
                disabled={isPending}
                error={clientErrors.email?.message as string}
                placeholder="Email"
                size={30}
                type="text"
            />

            <Input
                {...register('password')}
                disabled={isPending}
                error={clientErrors.password?.message as string}
                placeholder="Password"
                size={30}
                type="password"
            />

            <Button
                disabled={!isValid || isPending}
                type="submit"
            >
                {isPending ? 'Working' : 'Login'}
            </Button>

            {serverErrors && <ErrorField>{serverErrors}</ErrorField>}

            <p className="mt-6">
                Do you need to create an account?{' '}
                <Link href="/signup">
                    <Button>Signup</Button>
                </Link>
            </p>
        </form>
    );
};
