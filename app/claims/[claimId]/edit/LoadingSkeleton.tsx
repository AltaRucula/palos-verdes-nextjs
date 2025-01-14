import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import React from 'react';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <h1>Edit Claim</h1>
            <Card>
                <section className="mt-6 ">
                    <div className="bg-secondary rounded-full h-4 w-full mb-4"/>
                    <div className="bg-secondary rounded-full h-4 w-full mb-4"/>
                    <div className="bg-secondary rounded-full h-4 w-80"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-secondary rounded-full h-4 w-40"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-secondary rounded-full h-4 w-20"/>
                </section>
                <section className="flex mt-8 ">
                    <div className="bg-tertiary ounded-full h-2 w-20 mr-4"/>
                    <div className="bg-tertiary rounded-full h-2 w-12 mr-4"/>
                    <div className="bg-tertiary rounded-full h-2 w-36"/>
                </section>
                <section className="flex justify-center">
                    <Button disabled={true}>Save</Button>
                </section>
            </Card>

            <span className="sr-only">Loading...</span>
        </div>
    );
};