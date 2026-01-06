import { shopifyClient } from "@/lib/graphql-client";
import {
  CREATE_CART,
  ADD_TO_CART,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "../queries/cartMutations";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type ShopifyGraphQLError = {
  response?: {
    errors?: Array<{
      extensions?: {
        code?: string;
      };
    }>;
  };
};

export async function createCart(variantId: string) {
  const res = await shopifyClient.request(CREATE_CART, {
    lines: [{ quantity: 1, merchandiseId: variantId }],
  });

  return res.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string) {
  const res = await shopifyClient.request(ADD_TO_CART, {
    cartId,
    lines: [{ quantity: 1, merchandiseId: variantId }],
  });

  return res.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
) {
  try {
    const res = await shopifyClient.request(CART_LINES_UPDATE, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });

    return res.cartLinesUpdate.cart;
  } catch (err: unknown) {
    const e = err as ShopifyGraphQLError;
    const code = e.response?.errors?.[0]?.extensions?.code;

    if (code === "CONFLICT") {
      await sleep(120);

      const retry = await shopifyClient.request(CART_LINES_UPDATE, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });

      return retry.cartLinesUpdate.cart;
    }

    throw err;
  }
}

export async function removeCartLine(cartId: string, lineId: string) {
  const res = await shopifyClient.request(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  });

  return res.cartLinesRemove.cart;
}
