import Link from "next/link";
import React from 'react';

const links = [
    {href: '/', label: 'Home', key: 'home'},
    {href: '/claims', label: 'Claims', key: 'claims'},
    {href: '/settings', label: 'Settings', key: 'settings'},
    {href: '/about', label: 'About', key: 'about'},
    {href: '/profile', label: 'Profile', key: 'profile'}
];

export const Navbar: React.FC = () => {
    return (
        <ul className="flex bg-primary-600 text-primary-200 justify-between px-12">
            {links.map(({href, label, key}) => (
                <Link
                    className="p-6 hover:text-primary-50 hover:font-bold hover:underline hover:underline-offset-8 hover:decoration-double no-underline"
                    href={href} key={key}>
                    <li>{label}</li>
                </Link>))}
        </ul>
    );
};