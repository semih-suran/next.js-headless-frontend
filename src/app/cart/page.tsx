"use client";

import { useCartViewModel } from "@/features/cart/hooks/useCartViewModel";

export default function CartPage() {
  const { cart } = useCartViewModel();

  return (
    <div className="max-w-4xl w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      {cart.status === "updating" && (
        <p className="text-blue-600 text-sm">
          Processing your request…
        </p>
      )}

      {cart.items.length === 0 ? (
        <p className="opacity-70 text-sm">
          Your cart is empty. Items you add will appear here.
        </p>
      ) : (
        <ul className="border rounded divide-y">
          {cart.items.map((line) => (
            <li key={line.id} className="p-3 flex justify-between">
              <span>{line.title}</span>
              <span className="opacity-70 text-sm">x{line.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
