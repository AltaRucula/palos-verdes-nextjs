import { Button } from '@/components/Button';
import ChangeThemeButton from '@/components/ChangeThemeButton';
import { getCookieSession } from '@/lib/session';
import Link from 'next/link';
import React from 'react';

type Link = {
    href: string;
    label: string;
    key: string;
};

const linksForUserWithoutSession: Link[] = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/login', label: 'Login', key: 'login' },
    { href: '/signup', label: 'Signup', key: 'signup' },
];

const linksForUserWithSession: Link[] = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/claims', label: 'Claims', key: 'claims' },
    { href: '/profile', label: 'Profile', key: 'profile' },
];

export const Navbar: React.FC = async () => {
    const currentSession = await getCookieSession();

    const getLinks = (): Link[] => {
        if (currentSession) {
            return linksForUserWithSession;
        }

        return linksForUserWithoutSession;
    };

    return (
        <div className="flex border-b border-secondary-light dark:border-secondary-dark justify-between mx-12 py-6">
            {getLinks().map(({ href, label, key }) => (
                <Link
                    href={href}
                    key={key}
                >
                    <Button>{label}</Button>
                </Link>
            ))}
            <ChangeThemeButton />
        </div>
    );
};
