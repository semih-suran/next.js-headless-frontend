import { useShopifyQuery } from '@/lib/useShopifyQuery';
import { GET_PRODUCTS } from '../queries/getProducts';
import { ProductConnection } from '../types';

interface UseProductsOptions {
  query?: string;
  sortKey?: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'BEST_SELLING';
  reverse?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { query, sortKey, reverse } = options;

  const { data, isLoading, error } = useShopifyQuery<{ products: ProductConnection }>(
    [GET_PRODUCTS, { query, sortKey, reverse }], 
    GET_PRODUCTS,
    { 
      query, 
      sortKey, 
      reverse 
    }
  );

  if (error) console.error('useProducts API Error:', error);

  return {
    products: data?.products.edges.map((edge) => edge.node) ?? [],
    isLoading,
    error,
  };
}