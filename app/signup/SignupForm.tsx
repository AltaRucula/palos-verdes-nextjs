"use client";

import { signup } from '@/app/signup/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { useActionState } from 'react';

export const SignupForm = () => {
    const [state, action, isPending] = useActionState(signup, {
        success: false
    });

    return (
        <form action={action} className="flex flex-col items-center p-10">
            <Input name="email" type="text" placeholder="Email" size={30}/>
            <Input name="password" type="password" placeholder="Password" size={30}/>
            {state.errors && <p className="text-red-500">{state.errors}</p>}
            <Button disabled={isPending} type="submit">Signup</Button>
            <p className="mt-6">Already have an account? <Link href="/login">Login</Link></p>
        </form>
    )
}