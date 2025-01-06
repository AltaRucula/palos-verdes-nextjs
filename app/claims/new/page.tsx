import { NewForm } from '@/app/claims/new/NewForm';
import { Card } from '@/components/Card';

const Page = () => {
    return (
        <div className="flex-auto">
            <h1>New Claim</h1>
            <Card>
                <NewForm/>
            </Card>
        </div>
    );
}

export default Page;