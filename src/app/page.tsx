import { ProductGrid } from "@/features/catalog/components/ProductGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Shopify Headless Frontend
        </h1>

        <p className="text-muted-foreground">
          Product catalog powered by Shopify Storefront GraphQL API.
          This MVP renders a live product grid as the foundation for the catalog experience.
        </p>
      </div>

      <ProductGrid />
    </main>
  );
}
