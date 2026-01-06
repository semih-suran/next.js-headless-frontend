"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { useProduct } from "@/features/catalog/hooks/useProduct";
import { ProductInfoPanel } from "@/features/product/components/ProductInfoPanel";
import { VariantOptionsPanel } from "@/features/product/components/VariantOptionsPanel";
import { useCartViewModel } from "@/features/cart/hooks/useCartViewModel";

type ResolvedVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

export default function ProductDetailsPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";

  const { data, isLoading, error } = useProduct(handle);
  const p = data?.product ?? null;

  const { cart, addVariant } = useCartViewModel();

  const [resolvedVariant, setResolvedVariant] =
    useState<ResolvedVariant | null>(null);

  const autoResolvedVariant = useMemo<ResolvedVariant | null>(() => {
    if (!p) return null;

    const single = p.variants?.nodes?.[0];
    const hasNoOptions = !p.options || p.options.length === 0;
    const onlyOneVariant =
      !!p.variants?.nodes && p.variants.nodes.length === 1;

    if (hasNoOptions && onlyOneVariant && single) {
      return {
        id: single.id,
        title: single.title,
        availableForSale: single.availableForSale,
      };
    }

    return null;
  }, [p]);

  const activeVariant = resolvedVariant ?? autoResolvedVariant;

  function handleAddToCart() {
    if (!activeVariant) return;
    addVariant(activeVariant.id);
  }

  if (!handle) {
    return <p className="text-red-600">Invalid product reference.</p>;
  }

  if (isLoading) {
    return <p className="opacity-70 text-sm">Loading product…</p>;
  }

  if (error || !p) {
    return <p className="text-red-600">Product not found.</p>;
  }

  const requiresSelection = !!p.options?.length && !activeVariant;

  return (
    <div className="max-w-5xl w-full flex flex-col gap-6">
      <Breadcrumb
        items={[{ label: "Products", href: "/products" }, { label: p.title }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {p.featuredImage?.url && (
            <Image
              src={p.featuredImage.url}
              alt={p.featuredImage.altText ?? p.title}
              width={800}
              height={800}
              className="rounded"
            />
          )}
        </div>

        <ProductInfoPanel
          title={p.title}
          price={{
            amount: p.priceRange?.minVariantPrice?.amount,
            currencyCode: p.priceRange?.minVariantPrice?.currencyCode,
          }}
          description={p.description}
          isReady={!!activeVariant}
        />

        <VariantOptionsPanel
          options={p.options}
          variants={p.variants?.nodes}
          onResolve={setResolvedVariant}
        />

        <div className="mt-2">
          <button
            disabled={requiresSelection || cart.status === "updating"}
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded border text-sm font-medium transition
              ${
                requiresSelection
                  ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                  : cart.status === "updating"
                  ? "bg-gray-800 text-white opacity-70"
                  : "bg-black text-white"
              }`}
          >
            {requiresSelection
              ? "Pick an option first"
              : cart.status === "updating"
              ? "Adding…"
              : "Add to Cart"}
          </button>

          {cart.status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
