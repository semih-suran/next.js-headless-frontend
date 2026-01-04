import { ProductGrid } from "@/features/catalog/components/ProductGrid";

export default function ProductsPage() {
  return (
    <>
      <header className="max-w-4xl w-full text-center space-y-2 mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm opacity-70">
          Browse items powered by the Shopify Storefront GraphQL API.
        </p>
      </header>

      <ProductGrid />
    </>
  );
}
