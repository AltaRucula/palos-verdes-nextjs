import { LoginForm } from '@/app/login/LoginForm';
import { Card } from '@/components/Card';

const Page = () => {
    return (
        <div className="flex-col mx-auto">
            <h1 className="mb-4">Login</h1>

            <Card>
                <LoginForm/>
            </Card>

        </div>
    );
}
export default Page;