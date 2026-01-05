import { shopifyClient } from "@/lib/graphql-client";
import { CREATE_CART, ADD_TO_CART } from "../queries/cartMutations";

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
