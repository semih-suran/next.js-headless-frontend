import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_PRODUCT_BY_HANDLE } from "../queries/getProductByHandle";
import type { ProductSummary } from "../types";

type ProductResponse = {
  product: ProductSummary & {
    description?: string | null;
  } | null;
};

export function useProduct(handle: string) {
  return useShopifyQuery<ProductResponse>(
    ["product", { handle }],
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
}