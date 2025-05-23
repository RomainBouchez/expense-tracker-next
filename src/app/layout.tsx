import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Expense Tracker',
    description: 'Track your expenses and income.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="dark">
        <head>
            {/*
          The <title> and <meta name="description"> will be injected here by Next.js
          based on the `metadata` object.
          You can add other head elements here if needed, like custom fonts not handled by next/font,
          or specific meta tags.
        */}
        </head>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}