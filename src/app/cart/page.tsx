"use client";

import { useCartViewModel } from "@/features/cart/hooks/useCartViewModel";
import { useCartDetails } from "@/features/cart/hooks/useCartDetails";

export default function CartPage() {
  const { cart: cartState } = useCartViewModel();

  const effectiveCartId =
    cartState.status === "restoring" ? null : cartState.id;

  const { data, isLoading, error } = useCartDetails(effectiveCartId);

  const lines = data?.cart?.lines.edges ?? [];
  const subtotal = data?.cart?.cost?.subtotalAmount;

  return (
    <div className="max-w-4xl w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      {cartState.status === "restoring" ? (
        <p className="opacity-70 text-sm">Restoring cart…</p>
      ) : !cartState.id ? (
        <p className="opacity-70 text-sm">
          Your cart is empty. Items you add will appear here.
        </p>
      ) : isLoading ? (
        <p className="opacity-70 text-sm">Loading your cart…</p>
      ) : error || !data?.cart ? (
        <p className="text-red-600 text-sm">
          We couldn&apos;t load your cart right now. Please try again.
        </p>
      ) : lines.length === 0 ? (
        <p className="opacity-70 text-sm">
          Your cart is empty. Items you add will appear here.
        </p>
      ) : (
        <>
          <ul className="border rounded divide-y">
            {lines.map(({ node }) => {
              const price =
                node.cost?.totalAmount?.amount ??
                node.merchandise.price?.amount ??
                "0.00";

              const currency =
                node.cost?.totalAmount?.currencyCode ??
                node.merchandise.price?.currencyCode ??
                "";

              return (
                <li
                  key={node.id}
                  className="p-3 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {node.merchandise.product.title}
                    </span>
                    <span className="text-xs opacity-70">
                      Variant: {node.merchandise.title}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">Qty: {node.quantity}</p>
                    <p className="text-xs opacity-70">
                      {price} {currency}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {subtotal && (
            <div className="flex justify-end mt-2 text-sm">
              <span className="font-medium">
                Subtotal: {subtotal.amount} {subtotal.currencyCode}
              </span>
            </div>
          )}

          <div className="mt-4">
            <a
              href={data.cart.checkoutUrl}
              className="inline-block border px-4 py-2 rounded text-sm font-medium"
            >
              Proceed to checkout
            </a>
          </div>
        </>
      )}
    </div>
  );
}
