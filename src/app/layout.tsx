import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Finder',
  description: 'Find your favorite recipes easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-blue-100 min-h-screen flex flex-col`}
      >
        <header className="bg-blue-900 text-white p-4 shadow-md flex items-center justify-between">
          <h1 className="text-2xl font-bold">Recipe Finder</h1>
        </header>

        <main className="flex-grow w-full flex justify-center p-4 bg-blue-100">
          {children}
        </main>

        <footer className="bg-blue-900 text-white p-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Recipe Finder
        </footer>
      </body>
    </html>
  );
}
