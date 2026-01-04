import { useState } from "react";
import type { CartViewModel } from "../types";

const initialState: CartViewModel = {
  status: "idle",
  items: [],
};

export function useCartViewModel() {
  const [cart, setCart] = useState<CartViewModel>(initialState);

  return {
    cart,
    setCart,
  };
}
