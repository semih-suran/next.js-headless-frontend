'use client';

import Link from 'next/link';

export default function AccountPage() {
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-lg font-semibold mb-2">Welcome back!</h2>
        <p className="text-gray-600 text-sm">
          From your account dashboard you can view your{' '}
          <Link href="/account/orders" className="underline hover:text-black">
            recent orders
          </Link>
          , manage your{' '}
          <Link href="/account/addresses" className="underline hover:text-black">
            shipping and billing addresses
          </Link>
          , and edit your{' '}
          <Link href="/account/profile" className="underline hover:text-black">
            password and account details
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="/account/orders"
          className="block p-5 border rounded-lg hover:border-black transition-colors group"
        >
          <div className="font-medium group-hover:underline">Order History</div>
          <div className="text-sm text-gray-500 mt-1">Track, return, or buy things again.</div>
        </Link>

        <Link 
          href="/account/profile"
          className="block p-5 border rounded-lg hover:border-black transition-colors group"
        >
          <div className="font-medium group-hover:underline">Profile & Security</div>
          <div className="text-sm text-gray-500 mt-1">Edit login, name, and mobile number.</div>
        </Link>
      </div>
    </div>
  );
}