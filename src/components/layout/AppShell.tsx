"use client";

import Link from "next/link";
import { AuthStatus } from "@/features/auth/components/AuthStatus";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              Headless Storefront
            </Link>

            <nav className="flex gap-4 text-sm opacity-80 items-center">
              <Link href="/products" className="hover:underline">Products</Link>
              <Link href="/cart" className="hover:underline">Cart</Link>
              <AuthStatus />
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center px-4 py-8">
          {children}
        </main>

        <footer className="border-t text-xs opacity-70 py-4 text-center">
          Shopify Storefront API
        </footer>
      </div>
    </AuthProvider>
  );
}