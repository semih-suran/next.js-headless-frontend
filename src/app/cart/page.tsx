"use client";

import { useCartViewModel } from "@/features/cart/hooks/useCartViewModel";
import { useCartDetails } from "@/features/cart/hooks/useCartDetails";

export default function CartPage() {
  const { cart: cartState, updateLine, removeLine } = useCartViewModel();

  const effectiveCartId =
    cartState.status === "restoring" ? null : cartState.id;

  const { data, isLoading, error, mutate } =
    useCartDetails(effectiveCartId);

  const lines = data?.cart?.lines.edges ?? [];
  const subtotal = data?.cart?.cost?.subtotalAmount;

  const isBusy = cartState.status === "updating";

  async function handleQty(id: string, qty: number) {
    await updateLine(id, qty);
    await mutate();
  }

  async function handleRemove(id: string) {
    await removeLine(id);
    await mutate();
  }

  return (
    <div className="max-w-4xl w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      {cartState.status === "restoring" ? (
        <p className="opacity-70 text-sm">&nbsp;</p>
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
              const unit = parseFloat(
                node.merchandise.price?.amount ??
                  node.cost?.totalAmount?.amount ??
                  "0"
              );

              const currency =
                node.merchandise.price?.currencyCode ??
                node.cost?.totalAmount?.currencyCode ??
                "";

              const lineTotal = unit * node.quantity;

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

                  <div className="flex items-center gap-3">
                    <button
                      disabled={isBusy || node.quantity <= 1}
                      className="border px-2 rounded disabled:opacity-40"
                      onClick={() =>
                        handleQty(node.id, node.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span className="text-sm">{node.quantity}</span>

                    <button
                      disabled={isBusy}
                      className="border px-2 rounded disabled:opacity-40"
                      onClick={() =>
                        handleQty(node.id, node.quantity + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      disabled={isBusy}
                      className="text-red-600 text-xs ml-2 disabled:opacity-40"
                      onClick={() => handleRemove(node.id)}
                    >
                      Remove
                    </button>

                    <div className="text-right ml-4">
                      <p className="text-sm">
                        {lineTotal.toFixed(2)} {currency}
                      </p>
                      <p className="text-xs opacity-70">
                        {unit.toFixed(2)} {currency} each
                      </p>
                    </div>
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
