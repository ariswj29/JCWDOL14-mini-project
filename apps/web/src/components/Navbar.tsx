import Image from 'next/image';
import Link from 'next/link';

export const Navbar = (props: any) => {
  return (
    <header className="grid md:grid-cols-3 grid-cols-2 md:px-40 px-4 items-center bg-secondary sticky top-0 z-50">
      <div className="md:col-span-2 sm:col-span-1 py-2 h-14"></div>
    </header>
  );
};
