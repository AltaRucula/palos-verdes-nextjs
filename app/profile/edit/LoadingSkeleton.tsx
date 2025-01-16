import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import React from 'react';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <h1>Edit Profile</h1>
            <Card className="flex flex-col items-center p-8">
                <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-8 w-80 mb-4" />
                <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-8 w-full mb-4" />
                <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-8 w-full mb-8" />
                <Button disabled={true}>Save</Button>
            </Card>

            <span className="sr-only">Loading...</span>
        </div>
    );
};
