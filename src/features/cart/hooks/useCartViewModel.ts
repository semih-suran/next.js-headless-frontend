import { useState } from "react";
import type { CartViewModel } from "../types";

const initialState: CartViewModel = {
  status: "idle",
  items: [],
};

export function useCartViewModel() {
  const [cart, setCart] = useState<CartViewModel>(initialState);

  function requestAddToCart(variantId: string, quantity = 1) {
    setCart((prev) => ({
      ...prev,
      status: "updating",
      pendingIntent: {
        type: "add",
        variantId,
        quantity,
      },
    }));
  }

  function clearIntent() {
    setCart((prev) => ({
      ...prev,
      status: "idle",
      pendingIntent: undefined,
    }));
  }

  return {
    cart,
    requestAddToCart,
    clearIntent,
  };
}
