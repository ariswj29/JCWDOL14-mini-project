import { navbars } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#C5DCFF] p-8">
      <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-4 max-w-screen-xl mx-auto">
        <div className="col-span-2 px-6">
          <Image src="/logo.png" alt="RizzCorps" width={150} height={25} />
          <p className="mt-2 text-justify">
            GoTicks is your trusted platform for purchasing tickets to various
            events online. Discover and book tickets for concerts, football
            matches, seminars, exhibitions, and more easily and securely.
          </p>
        </div>
        <div className="px-6">
          <h3 className="text-2xl font-bold">Menu</h3>
          <ul className="mt-2">
            {navbars.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="nav-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 px-6">
          <h3 className="text-2xl font-bold">Information Contact</h3>
          <p className="mt-2">
            Address: Jl Tebet Barat Dalam Raya No. 3, Jakarta Selatan
          </p>
          <p>Email: info@goticks.com</p>
          <p>Phone: +62 123 456 789</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© 2024 GoTicks. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
