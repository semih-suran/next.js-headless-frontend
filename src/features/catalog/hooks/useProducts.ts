import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_PRODUCTS } from "../queries/getProducts";
import type { ProductSummary } from "../types";

type ProductsResponse = {
  products: {
    nodes: ProductSummary[];
  };
};

export function useProducts(limit = 12) {
  return useShopifyQuery<ProductsResponse>(
    ["products", { first: limit }],
    GET_PRODUCTS,
    { first: limit }
  );
}