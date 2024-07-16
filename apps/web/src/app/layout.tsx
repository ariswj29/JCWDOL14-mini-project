import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import UserLayout from './user.layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | GoTicks',
    default: 'GoTicks',
  },
  description: 'A simple ticketing system for your projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayout>{children}</UserLayout>;
}
