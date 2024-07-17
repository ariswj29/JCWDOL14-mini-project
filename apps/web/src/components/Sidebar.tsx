import { logoutProcess } from '@/api/auth';
import { sidebars } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-secondary w-64 h-screen fixed top-0 left-0 z-50">
      <div className="flex items-center justify-center h-14">
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="GoTicks" width={150} height={25} />
        </Link>
      </div>
      <nav className="px-4 mt-4">
        <ul>
          {sidebars.map((sidebar) => (
            <li key={sidebar.id} className="p-2">
              <Link
                className={pathname === sidebar.link ? 'active' : 'nav-link'}
                href={sidebar.link}
              >
                {sidebar.title}
              </Link>
            </li>
          ))}
          <hr className="my-2 border-black border" />
          <li className="p-2">
            <Link
              href="/login"
              className="hover:font-bold"
              onClick={() => {
                async function deleteSession() {
                  await logoutProcess();
                  window.location.href = '/login';
                }
                deleteSession();
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
