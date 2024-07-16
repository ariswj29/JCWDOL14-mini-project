import Image from 'next/image';
import Link from 'next/link';

export const Navbar = (props: { users: { firstName: ''; lastName: '' } }) => {
  return (
    <header className="grid md:grid-cols-3 grid-cols-2 md:px-40 px-4 items-center bg-secondary top-0 z-50">
      <div className="grid col-span-3 py-2 h-14 text-end items-center">
        <a>
          Hello, {props.users?.firstName} {props.users?.lastName}
        </a>
      </div>
    </header>
  );
};
