import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_PRODUCT_BY_HANDLE } from "../queries/getProductByHandle";

export function useProduct(handle: string) {
  return useShopifyQuery<{ product: any }>(
    ["product", { handle }],
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
}