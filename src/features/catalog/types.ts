export interface ProductSummary {
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  availableForSale?: boolean;
}

export interface ProductEdge {
  node: ProductSummary;
}

export interface ProductConnection {
  edges: ProductEdge[];
}