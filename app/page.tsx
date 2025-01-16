import { Card } from '@/components/Card';

const Page = () => {
    return (
        <div className="flex-auto">
            <h1 className="mb-4">Hello</h1>

            <Card>
                <p className="my-4">
                    This is a project to help the community of Palos Verdes so people can leverage their complains
                    through the power of votes.
                </p>

                <p className="my-4">
                    People can create claims and vote for them. The claims with more votes will be displayed first.
                </p>

                <p className="my-4">
                    This application is built with React Native and Expo. For any questions or suggestions, please
                    contact me at{' '}
                    <a
                        className="underline underline-offset-4 decoration-dotted"
                        href="mailto:zfngomez@gmail.com"
                    >
                        zfngomez@gmail.com
                    </a>
                </p>

                <p className="my-4">Click on any link from the navbar to start</p>
            </Card>
        </div>
    );
};

export default Page;
