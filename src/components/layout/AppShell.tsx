"use client";

import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            Headless Storefront
          </Link>

          <nav className="flex gap-4 text-sm opacity-80">
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/account">My Account</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {children}
      </main>

      <footer className="border-t text-xs opacity-70 py-4 text-center">
        Demo storefront — Shopify Storefront API
      </footer>
    </div>
  );
}