import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_PRODUCT_BY_HANDLE } from "../queries/getProductByHandle";

type ProductOption = {
  name: string;
  values: string[];
};

type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

type Product = {
  id: string;
  title: string;
  description?: string | null;

  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;

  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };

  options?: ProductOption[];

  variants?: {
    nodes: ProductVariant[];
  };
};

type ProductResponse = {
  product: Product | null;
};

export function useProduct(handle: string) {
  return useShopifyQuery<ProductResponse>(
    ["product", { handle }],
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
}