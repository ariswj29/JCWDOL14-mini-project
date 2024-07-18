'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import Image from 'next/image';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] });

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      const role = Cookies.get('role');
      const token = Cookies.get('token');
      const users = localStorage.getItem('user');

      if (token && users) {
        setToken(token);
        setUser(JSON.parse(users || '{}'));
        if (role == 'admin') {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body
          className={`${inter.className} flex items-center justify-center h-screen`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-3xl my-2">
              <Image src="/logo.svg" alt="GoTicks" width={250} height={75} />
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    );
  }

  if (isAdmin) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Navbar users={user} />
          {children}
          <Sidebar />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header token={token} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
