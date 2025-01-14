"use client";

import { login } from '@/app/login/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { useActionState } from 'react';

export const LoginForm = () => {
    const [state, action, isPending] = useActionState(login, {
        success: false
    });

    return (
        <form action={action} className="flex flex-col items-center p-10">
            <Input disabled={isPending} name="email" type="text" placeholder="Email" size={30}/>
            <Input disabled={isPending} name="password" type="password" placeholder="Password" size={30}/>
            {state.errors && <p className="text-red-500">{state.errors}</p>}
            <Button disabled={isPending} type="submit">{isPending ? 'Working' : 'Login'}</Button>
            <p className="mt-6">Do you need to create an account? <Link href="/signup"><Button>Signup</Button></Link></p>
        </form>
    )
}