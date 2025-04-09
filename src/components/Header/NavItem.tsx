'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  children: React.ReactNode;
  path?: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, path }) => {
  const pathname = usePathname();
  const effectivePath = path || '';
  const isActive = pathname === effectivePath;

  return (
    <Link
      href={effectivePath}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
        isActive ? 'active cursor-pointer' : 'cursor-pointer inactive'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
