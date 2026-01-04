"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { useProduct } from "@/features/catalog/hooks/useProduct";

export default function ProductDetailsPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "";
  const { data, isLoading, error } = useProduct(handle);

  if (!handle) {
  return <p className="text-red-600">Invalid product reference.</p>;
  }

  if (isLoading) {
    return <p className="opacity-70 text-sm">Loading product…</p>;
  }

  if (error || !data?.product) {
    return <p className="text-red-600">Product not found.</p>;
  }

  const p = data.product;

  return (
    <div className="max-w-5xl w-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: p.title },
        ]}
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

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{p.title}</h1>

          <p className="text-sm opacity-70">
            {p.priceRange?.minVariantPrice?.amount}{" "}
            {p.priceRange?.minVariantPrice?.currencyCode}
          </p>

          {p.description && (
            <p className="text-sm leading-relaxed">{p.description}</p>
          )}

          <div className="mt-4">
            <button
              disabled
              className="border px-4 py-2 rounded opacity-70"
            >
              Add to Cart (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}