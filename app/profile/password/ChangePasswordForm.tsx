'use client';

import { changePassword } from '@/app/profile/password/actions';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import React, { useActionState } from 'react';

type Props = {
    userId: string;
}

export const ChangePasswordForm: React.FC<Props> = ({userId}) => {
    const [state, action, isPending] = useActionState(changePassword, {
        success: false,
        payload: {
            userId
        }
    });

    return (
        <div className="flex-auto">
            <h1>Change Password</h1>
            <Card>
                <form
                    action={action}
                    className="flex flex-col items-center p-10">
                    <Input
                        disabled={isPending} name="currentPassword"
                        type="text"
                        placeholder="Current Password"
                        size={30}
                    />
                    <Input
                        disabled={isPending}
                        name="newPassword"
                        type="text"
                        placeholder="New Password"
                        size={30}/>
                    <Input
                        disabled={isPending}
                        name="confirmNewPassword"
                        type="text"
                        placeholder="Confirm New Password"
                        size={30}/>

                    {state.errors && <p className="text-red-500">{state.errors}</p>}

                    <Button
                        disabled={isPending}
                        type="submit">
                        {isPending ? 'Working' : 'Save'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}