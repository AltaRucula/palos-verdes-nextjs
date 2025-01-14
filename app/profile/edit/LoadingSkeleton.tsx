import { Card } from '@/components/Card';
import React from 'react';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <h1>Edit Profile</h1>
            <Card className="flex flex-col items-center p-20 mt-6">
                <div className="bg-primary-600 rounded-full h-8 w-72 mb-4"/>
                <div className="bg-primary-600 rounded-full h-8 w-full mb-4"/>
                <div className="bg-primary-600 rounded-full h-8 w-full mb-8"/>
                <div className="bg-primary-600 rounded-full h-8 w-32"/>
            </Card>

            <span className="sr-only">Loading...</span>
        </div>
    );
};