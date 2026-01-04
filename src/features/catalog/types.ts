export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
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
};
