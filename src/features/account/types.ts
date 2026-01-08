export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: Money;
  subtotalPrice?: Money;
  totalShippingPrice?: Money;
  totalTax?: Money;
  shippingAddress?: Address;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        originalTotalPrice?: Money;
        variant?: {
          title: string;
          price?: Money;
          image?: {
            url: string;
            altText?: string;
          };
        };
      };
    }>;
  };
}

export interface CustomerOrdersResponse {
  customer: {
    orders: {
      edges: Array<{ node: Order }>;
    };
  } | null;
}

export interface OrderDetailResponse {
  node: Order | null;
}