'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { set } from 'cypress/types/lodash';

const inter = Inter({ subsets: ['latin'] });

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>('');
  console.log('token layout', token);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');
      setToken(token);
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [token]);

  if (isAdmin) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="admin-header">Admin Header</div>
          {children}
          <div className="admin-footer">Admin Footer</div>
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
