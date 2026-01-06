'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export function AuthStatus() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div className="h-5 w-16 bg-gray-100 animate-pulse rounded" />;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/account" className="text-sm font-medium hover:underline">
          My Account
        </Link>
        <button 
          onClick={() => logout()} 
          className="text-sm text-gray-500 hover:text-black"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="text-sm font-medium hover:underline">
      Log In
    </Link>
  );
}