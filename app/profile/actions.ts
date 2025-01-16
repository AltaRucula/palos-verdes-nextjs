'use server';

import { deleteSession } from '@/lib/session';
import { ActionState } from '@/types/actionState';
import { redirect } from 'next/navigation';

export const logout = async (actionState: ActionState<null>, formData: FormData): Promise<ActionState<null>> => {
    await deleteSession();

    return redirect('/');
};
