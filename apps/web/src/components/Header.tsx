'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navbars } from '@/data/data';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="grid md:grid-cols-3 grid-cols-2 md:px-40 px-4 items-center bg-[#C5DCFF] sticky top-0 z-50">
      <div className="md:col-span-2 sm:col-span-1 py-2">
        <Link href="/">
          <Image src="/logo.svg" alt="GoTicks" width={150} height={25} />
        </Link>
      </div>
      <div className="md:hidden md:col-span-1 sm:col-span-1 py-6 justify-self-end">
        <button
          className="flex items-center rounded border-2 border-black px-3 py-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${isMenuOpen ? 'col-span-2 md:col-span-1' : 'hidden'} md:block py-4`}
      >
        <nav>
          <ul className="grid md:grid-cols-3 md:gap-0 gap-4">
            {navbars.map((navbar) => (
              <li key={navbar.id} className="text-center">
                <Link
                  href={navbar.link}
                  className={pathname === navbar.link ? 'active' : 'nav-link'}
                >
                  {navbar.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
