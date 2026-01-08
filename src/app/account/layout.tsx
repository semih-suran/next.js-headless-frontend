import { AccountNavigation } from '@/features/account/components/AccountNavigation';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl w-full mx-auto pb-12">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="text-gray-500 mt-1">Manage your orders and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="w-full md:w-auto">
          <AccountNavigation />
        </aside>

        <main className="flex-1 min-h-[400px]">
          {children}
        </main>
      </div>
    </div>
  );
}