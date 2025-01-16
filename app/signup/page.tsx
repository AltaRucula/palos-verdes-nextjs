import { SignupForm } from '@/app/signup/SignupForm';
import { Card } from '@/components/Card';

const Page = () => {
    return (
        <div className="flex-col mx-auto">
            <h1 className="mb-4">Signup</h1>

            <Card>
                <SignupForm />
            </Card>
        </div>
    );
};
export default Page;
