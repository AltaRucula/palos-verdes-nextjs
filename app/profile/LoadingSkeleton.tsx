export const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <section>
                <div className="bg-primary-600 rounded-full h-4 w-80"/>
            </section>
            <span className="sr-only">Loading...</span>
        </div>
    );
};