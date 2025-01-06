"use server";

import { ActionState } from '@/actions/actionState';
import { deleteSession } from '@/lib/session';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';

export const logout = async (
    actionState: ActionState<User>,
    formData: FormData
): Promise<ActionState<User>> => {
    await deleteSession();

    return redirect('/');
}