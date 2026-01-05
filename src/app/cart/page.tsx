"use client";

import { useCartViewModel } from "@/features/cart/hooks/useCartViewModel";

export default function CartPage() {
  const { cart } = useCartViewModel();

  return (
    <div className="max-w-4xl w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      {cart.id === null ? (
        <p className="opacity-70 text-sm">
          Your cart is empty. Items you add will appear here.
        </p>
      ) : (
        <p className="opacity-70 text-sm">
          Cart created — line-item hydration coming next.
        </p>
      )}

      {cart.status === "updating" && (
        <p className="text-sm opacity-70">Updating cart…</p>
      )}

      {cart.status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong fetching the cart state.
        </p>
      )}
    </div>
  );
}
