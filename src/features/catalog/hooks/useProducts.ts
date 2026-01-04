import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_PRODUCTS } from "../queries/getProducts";

export function useProducts(limit = 12) {
  return useShopifyQuery<{ products: { nodes: any[] } }>(
    ["products", { first: limit }],
    GET_PRODUCTS,
    { first: limit }
  );
}
