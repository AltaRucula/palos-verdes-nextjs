import { getSession } from "@/lib/session";
import Link from "next/link";
import React from 'react';

type Link = {
    href: string;
    label: string;
    key: string;
}

const linksForUserWithoutSession: Link[] = [
    {href: '/', label: 'Home', key: 'home'},
    {href: '/login', label: 'Login', key: 'login'},
    {href: '/signup', label: 'Signup', key: 'signup'}
];

const linksForUserWithSession: Link[] = [
    {href: '/', label: 'Home', key: 'home'},
    {href: '/claims', label: 'Claims', key: 'claims'},
    {href: '/settings', label: 'Settings', key: 'settings'},
    {href: '/profile', label: 'Profile', key: 'profile'}
];

export const Navbar: React.FC = async () => {
    const currentSession = await getSession();

    const getLinks = (): Link[] => {
        if (currentSession) {
            return linksForUserWithSession
        }

        return linksForUserWithoutSession;
    }

    return (
        <ul className="flex bg-primary-600 text-primary-200 justify-between px-12">
            {getLinks().map(({href, label, key}) => (
                <Link
                    className="p-6 hover:text-primary-50 hover:font-bold hover:underline hover:underline-offset-8 hover:decoration-double no-underline"
                    href={href} key={key}>
                    <li>{label}</li>
                </Link>))}
        </ul>
    );
};