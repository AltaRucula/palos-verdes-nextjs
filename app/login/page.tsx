import { LoginForm } from '@/app/login/LoginForm';
import { Card } from '@/components/Card';
import { GeneralError } from '@/components/GeneralError';

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const isForbidden = (await searchParams).forbidden;

    return (
        <div className="flex-col mx-auto">
            <h1 className="mb-4">Login</h1>

            <Card>
                {isForbidden ? (
                    <GeneralError text={'You need to be logged in to access certain functionalities of this site'} />
                ) : null}
                <LoginForm />
            </Card>
        </div>
    );
};
export default Page;
