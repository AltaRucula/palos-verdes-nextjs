export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <section>
                <div className="bg-primary-light dark:bg-primary-dark rounded-full h-4 w-80"/>
            </section>
            <span className="sr-only">Loading...</span>
        </div>
    );
};