import { Card } from '@/components/Card';
import { Tag } from '@/components/Tag';

export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            {Array.from(Array(3).keys()).map((_, index) =>
                <Card key={index}>
                    <h1>
                        <div className="bg-primary-600 rounded-full mb-4 h-6 w-96"/>
                    </h1>
                    <section className="mt-6 ">
                        <div className="bg-primary-600 rounded-full h-4 w-80"/>
                    </section>
                    <section className="flex mt-8 ">
                        <Tag>
                            <div className="rounded-full h-3 w-20"/>
                        </Tag>
                        <Tag>
                            <div className="rounded-full h-3 w-12"/>
                        </Tag>
                        <Tag>
                            <div className="rounded-full h-3 w-36"/>
                        </Tag>
                    </section>
                </Card>
            )}
            <span className="sr-only">Loading...</span>
        </div>
    );
};