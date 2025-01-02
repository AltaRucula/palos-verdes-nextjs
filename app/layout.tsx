import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import React from "react";

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: "Palos Verdes Claims"
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${roboto.className} antialiased flex flex-col h-screen`}
        >
        <header><Navbar/></header>
        <main className="flex container mb-auto mt-8 mx-auto">
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
        </body>
        </html>
    );
}