"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createCart, addToCart } from "../services/cartClient";

type CartStatus = "restoring" | "idle" | "updating" | "error";

type CartState = {
  id: string | null;
  status: CartStatus;
};

type CartContextValue = {
  cart: CartState;
  addVariant: (variantId: string) => Promise<void>;
  resetError: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    id: null,
    status: "restoring",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedId = window.localStorage.getItem(STORAGE_KEY);

    setCart({
      id: storedId ?? null,
      status: "idle",
    });
  }, []);

  async function addVariant(variantId: string) {
    setCart((c) => ({ ...c, status: "updating" }));

    try {
      const updated =
        cart.id === null
          ? await createCart(variantId)
          : await addToCart(cart.id, variantId);

      setCart({ id: updated.id, status: "idle" });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, updated.id);
      }
    } catch (err) {
      console.error("Cart mutation failed:", err);
      setCart((c) => ({ ...c, status: "error" }));
    }
  }

  function resetError() {
    setCart((c) => ({ ...c, status: "idle" }));
  }

  const value: CartContextValue = {
    cart,
    addVariant,
    resetError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCartContext must be used within CartProvider");
  }

  return ctx;
}
