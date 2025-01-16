import { Card } from '@/components/Card';
import React from 'react';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            {Array.from(Array(3).keys()).map((_, index) => (
                <Card key={index}>
                    <h1>
                        <div className="bg-secondary-light dark:bg-secondary-dark rounded-full mb-4 h-6 w-96" />
                    </h1>
                    <section className="mt-6 ">
                        <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-80" />
                    </section>
                    <section className="flex mt-8 ">
                        <div className="bg-tertiary-light dark:bg-tertiary-dark ounded-full h-2 w-20 mr-4" />
                        <div className="bg-tertiary-light dark:bg-tertiary-dark rounded-full h-2 w-12 mr-4" />
                        <div className="bg-tertiary-light dark:bg-tertiary-dark rounded-full h-2 w-36" />
                    </section>
                </Card>
            ))}
            <span className="sr-only">Loading...</span>
        </div>
    );
};
