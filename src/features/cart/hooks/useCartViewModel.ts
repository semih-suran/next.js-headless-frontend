import { useState } from "react";
import { createCart, addToCart } from "../services/cartClient";

type CartState = {
  id: string | null;
  status: "idle" | "updating" | "error";
};

export function useCartViewModel() {
  const [cart, setCart] = useState<CartState>({
    id: null,
    status: "idle",
  });

  async function addVariant(variantId: string) {
    setCart((c) => ({ ...c, status: "updating" }));

    try {
      const updated =
        cart.id === null
          ? await createCart(variantId)
          : await addToCart(cart.id, variantId);

      setCart({ id: updated.id, status: "idle" });
    } catch (err) {
      console.error("Cart mutation failed:", err);
      setCart((c) => ({ ...c, status: "error" }));
    }
  }

  function resetError() {
    setCart((c) => ({ ...c, status: "idle" }));
  }

  return {
    cart,
    addVariant,
    resetError,
  };
}
