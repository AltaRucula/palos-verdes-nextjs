import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <h1>
                <div className="bg-primary-600 rounded-full mb-4 h-6 w-96"/>
            </h1>
            <Card>
                <section className="mt-6 ">
                    <div className="bg-primary-600 rounded-full h-4 w-full mb-4"/>
                    <div className="bg-primary-600 rounded-full h-4 w-full mb-4"/>
                    <div className="bg-primary-600 rounded-full h-4 w-80"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-primary-600 rounded-full h-4 w-40"/>
                </section>
                <section className="mt-6 ">
                    <div className="bg-primary-600 rounded-full h-4 w-20"/>
                </section>
                <section className="flex mt-8 ">
                    <Tag>
                        <div className="rounded-full h-2 w-20"/>
                    </Tag>
                    <Tag>
                        <div className="rounded-full h-2 w-12"/>
                    </Tag>
                    <Tag>
                        <div className="rounded-full h-2 w-36"/>
                    </Tag>
                </section>
            </Card>

            <h1>Messages</h1>

            <Card>
                <div className="flex flex-col">
                <textarea
                    disabled={true}
                    className="border-primary-600 border mx-auto p-4 min-w-full rounded-md resize-none"
                    name="message"
                    placeholder="Type your message"
                    rows={3}/>
                    <Button disabled={true}>Send</Button>
                </div>

                <div className="mt-8">
                    {Array.from(Array(2).keys()).map((_, index) =>
                        <div className="border-t border-dotted border-primary-600 py-4" key={index}>
                            <div className="bg-primary-600 rounded-full h-4 w-80 mb-4"/>
                            <div className="bg-primary-600 rounded-full h-4 w-40"/>
                        </div>
                    )}
                </div>
            </Card>

            <span className="sr-only">Loading...</span>
        </div>
    );
};