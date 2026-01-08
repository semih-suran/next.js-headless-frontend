'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';

const NAV_ITEMS = [
  { label: 'Overview', href: '/account' },
  { label: 'Order History', href: '/account/orders' },
  { label: 'Profile', href: '/account/profile' },
  { label: 'Addresses', href: '/account/addresses' },
];

export function AccountNavigation() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <nav className="flex flex-col gap-1 w-full md:w-64 shrink-0">
      <div className="font-semibold text-xs uppercase text-gray-500 mb-2 px-3">
        Menu
      </div>
      
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 text-sm rounded-md transition-colors ${
              isActive
                ? 'bg-black text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <hr className="my-2 border-gray-100" />

      <button
        onClick={() => logout()}
        className="text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        Sign Out
      </button>
    </nav>
  );
}