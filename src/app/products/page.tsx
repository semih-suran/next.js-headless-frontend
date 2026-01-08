'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/features/catalog/components/ProductGrid';
import { ProductGridSkeleton } from '@/features/catalog/components/ProductGridSkeleton';
import { ProductGridEmpty } from '@/features/catalog/components/ProductGridEmpty';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { CatalogControls } from '@/features/catalog/components/CatalogControls';

function ProductsContent() {
  const searchParams = useSearchParams();
  
  const q = searchParams?.get('q');
  const sortParam = searchParams?.get('sort');

  let sortKey: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'BEST_SELLING' = 'CREATED_AT';
  let reverse = true; 

  switch (sortParam) {
    case 'PRICE_ASC':
      sortKey = 'PRICE';
      reverse = false;
      break;
    case 'PRICE_DESC':
      sortKey = 'PRICE';
      reverse = true;
      break;
    case 'TITLE':
      sortKey = 'TITLE';
      reverse = false;
      break;
    case 'CREATED_AT':
    default:
      sortKey = 'CREATED_AT';
      reverse = true;
      break;
  }

  const { products, isLoading, error } = useProducts({ 
    query: q || undefined, 
    sortKey, 
    reverse 
  });

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading products. Check console for details.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <CatalogControls />

      {isLoading ? (
        <ProductGridSkeleton />
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <ProductGridEmpty />
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}