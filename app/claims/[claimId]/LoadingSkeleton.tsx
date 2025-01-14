import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import React from 'react';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <section className="flex flex-row justify-between items-center">
                <h1>
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-6 w-96"/>
                </h1>
                <div className="flex flex-column gap-4">
                    <Button disabled={true}>Edit</Button>
                    <Button disabled={true}>Delete</Button>
                </div>
            </section>
            <Card>
                <section className="mt-6 ">
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-full mb-4"/>
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-full mb-4"/>
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-80"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-40"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-20"/>
                </section>
                <section className="flex mt-8 ">
                    <div className="bg-tertiary-light dark:bg-tertiary-dark ounded-full h-2 w-20 mr-4"/>
                    <div className="bg-tertiary-light dark:bg-tertiary-dark rounded-full h-2 w-12 mr-4"/>
                    <div className="bg-tertiary-light dark:bg-tertiary-dark rounded-full h-2 w-36"/>
                </section>
            </Card>

            <h2>Messages</h2>

            <Card>
                <div className="flex flex-col">
                <textarea
                    disabled={true}
                    className="bg-secondary-light dark:bg-secondary-dark border-0 mx-auto p-4 min-w-full rounded-md resize-none"
                    name="message"
                    placeholder="Type your message"
                    rows={3}/>
                    <Button disabled={true}>Send</Button>
                </div>

                <div className="mt-8">
                    {Array.from(Array(2).keys()).map((_, index) =>
                        <div className="border-t border-dotted border-tertiary-light dark:border-tertiary-dark py-4"
                             key={index}>
                            <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-4 w-80 mb-4"/>
                            <div className="bg-secondary-light dark:bg-secondary-dark rounded-full h-2 w-40"/>
                        </div>
                    )}
                </div>
            </Card>

            <span className="sr-only">Loading...</span>
        </div>
    );
};