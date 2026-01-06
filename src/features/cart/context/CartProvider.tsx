"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createCart,
  addToCart,
  updateCartLine,
  removeCartLine,
} from "../services/cartClient";

type CartStatus = "restoring" | "idle" | "updating" | "error";

type CartState = {
  id: string | null;
  status: CartStatus;
};

type CartContextValue = {
  cart: CartState;
  addVariant: (variantId: string) => Promise<void>;
  updateLine: (lineId: string, qty: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const STORAGE_KEY = "shopify_cart_id";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function useCartMutex() {
  const lock = useRef<Promise<void>>(Promise.resolve());

  async function enqueue<T>(fn: () => Promise<T>): Promise<T> {
    const prev = lock.current;
    let resolveNext!: () => void;

    lock.current = new Promise(r => (resolveNext = r));

    await prev;
    try {
      return await fn();
    } finally {
      resolveNext();
    }
  }

  return enqueue;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const enqueue = useCartMutex();

  const [cart, setCart] = useState<CartState>({
    id: null,
    status: "restoring",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    setCart({
      id: stored ?? null,
      status: "idle",
    });
  }, []);

  async function addVariant(variantId: string) {
    return enqueue(async () => {
      setCart(c => ({ ...c, status: "updating" }));
      try {
        const updated =
          cart.id === null
            ? await createCart(variantId)
            : await addToCart(cart.id, variantId);

        setCart({ id: updated.id, status: "idle" });
        window.localStorage.setItem(STORAGE_KEY, updated.id);
      } catch (e) {
        console.error("Cart mutation failed:", e);
        setCart(c => ({ ...c, status: "error" }));
      }
    });
  }

  async function updateLine(lineId: string, qty: number) {
    if (!cart.id) return;

    return enqueue(async () => {
      setCart(c => ({ ...c, status: "updating" }));
      try {
        await updateCartLine(cart.id!, lineId, qty);
        setCart(c => ({ ...c, status: "idle" }));
      } catch (e) {
        console.error("Update failed:", e);
        setCart(c => ({ ...c, status: "error" }));
      }
    });
  }

  async function removeLine(lineId: string) {
    if (!cart.id) return;

    return enqueue(async () => {
      setCart(c => ({ ...c, status: "updating" }));
      try {
        await removeCartLine(cart.id!, lineId);
        setCart(c => ({ ...c, status: "idle" }));
      } catch (e) {
        console.error("Remove failed:", e);
        setCart(c => ({ ...c, status: "error" }));
      }
    });
  }

  return (
    <CartContext.Provider
      value={{ cart, addVariant, updateLine, removeLine }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
