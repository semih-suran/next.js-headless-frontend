'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function CatalogControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams?.get('q') || '';
  const currentSort = searchParams?.get('sort') || 'CREATED_AT';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.push(`/products?${params.toString()}`);
  }, 300);

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', sortValue);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-start sm:items-center">
      <div className="w-full sm:w-72">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="CREATED_AT">Newest</option>
          <option value="PRICE_ASC">Price: Low to High</option>
          <option value="PRICE_DESC">Price: High to Low</option>
          <option value="TITLE">Name: A-Z</option>
        </select>
      </div>
    </div>
  );
}