"use client";

import { useCartContext } from "../context/CartProvider";

export function useCartViewModel() {
  return useCartContext();
}