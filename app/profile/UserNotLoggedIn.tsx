import Link from 'next/link';

export const UserNotLoggedIn = () => {
    return (
        <div>
            User not logged in !
            <div>
                <Link href="/login">Click here to be redirected to login page</Link>
            </div>
        </div>
    );
};
