'use client';

import { signup } from '@/app/signup/actions';
import { Button } from '@/components/Button';
import { ErrorField } from '@/components/ErrorField';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export const SignupForm = () => {
    const [state, action, isPending] = useActionState(signup, {
        success: false,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors, isValid },
    } = useForm({
        mode: 'onTouched',
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
                {...register('firstName', {
                    required: 'First name is required',
                })}
                defaultValue={state.payload?.savedFormData.firstName}
                disabled={isPending}
                error={clientErrors.firstName?.message as string}
                placeholder="First name"
                type="text"
                size={30}
            />
            <Input
                {...register('lastName', {
                    required: 'Last name is required',
                })}
                defaultValue={state.payload?.savedFormData.lastName}
                disabled={isPending}
                error={clientErrors.lastName?.message as string}
                placeholder="Last name"
                type="text"
                size={30}
            />
            <Input
                {...register('email', {
                    required: 'Email is required',
                })}
                defaultValue={state.payload?.savedFormData.email}
                disabled={isPending}
                error={clientErrors.email?.message as string}
                placeholder="Email"
                type="text"
                size={30}
            />
            <Input
                {...register('password', {
                    required: 'Password is required',
                })}
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

            {state.errors && <ErrorField>{state.errors}</ErrorField>}

            <p className="mt-6">
                Already have an account?{' '}
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </p>
        </form>
    );
};
