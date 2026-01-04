"use client";

import Image from "next/image";
import { useProducts } from "../hooks/useProducts";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

export function ProductGrid() {
  const { data, isLoading, error } = useProducts(12);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <p className="text-red-600">Failed to load products. Please try again.</p>
    );
  }

  const products = data?.products?.nodes ?? [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-3 flex flex-col gap-2 bg-white shadow-sm"
        >
          {p.featuredImage?.url ? (
            <Image
              src={p.featuredImage.url}
              alt={p.featuredImage.altText ?? p.title}
              width={400}
              height={400}
              className="rounded object-cover w-full h-auto"
            />
          ) : (
            <div className="w-full aspect-square rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              No image
            </div>
          )}
          <h3 className="font-semibold text-sm">{p.title}</h3>

          <p className="text-sm opacity-70">
            {p.priceRange?.minVariantPrice?.amount}{" "}
            {p.priceRange?.minVariantPrice?.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}
