"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProduct } from "@/features/catalog/hooks/useProduct";

export default function ProductDetailsPage() {
  const { handle } = useParams<{ handle: string }>();
  const { data, isLoading, error } = useProduct(handle);

  if (isLoading) {
    return <p className="opacity-70 text-sm">Loading product…</p>;
  }

  if (error || !data?.product) {
    return <p className="text-red-600">Product not found.</p>;
  }

  const p = data.product;

  return (
    <div className="max-w-3xl w-full flex flex-col gap-4">
      {p.featuredImage?.url && (
        <Image
          src={p.featuredImage.url}
          alt={p.featuredImage.altText ?? p.title}
          width={800}
          height={800}
          className="rounded"
        />
      )}

      <h1 className="text-2xl font-bold">{p.title}</h1>

      <p className="text-sm opacity-70">
        {p.priceRange?.minVariantPrice?.amount}{" "}
        {p.priceRange?.minVariantPrice?.currencyCode}
      </p>

      {p.description && (
        <p className="text-sm leading-relaxed">{p.description}</p>
      )}
    </div>
  );
}
