"use client";

import { useShopifyQuery } from "@/lib/useShopifyQuery";
import { GET_CART } from "../queries/getCart";

type CartLineNode = {
  id: string;
  quantity: number;
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    price?: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
    };
  };
};

type CartResponse = {
  cart: {
    id: string;
    checkoutUrl: string;
    lines: { edges: { node: CartLineNode }[] };
    cost?: {
      subtotalAmount?: {
        amount: string;
        currencyCode: string;
      };
    };
  } | null;
};

export function useCartDetails(cartId: string | null) {
  const key =
    cartId === null
      ? null
      : (["cart", { id: cartId }] as [string, { id: string }]);

  return useShopifyQuery<CartResponse>(
    key,
    GET_CART,
    cartId ? { id: cartId } : undefined
  );
}
