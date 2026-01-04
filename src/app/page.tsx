import { shopifyClient } from "@/lib/graphql-client";

export default async function HomePage() {
  const testQuery = /* GraphQL */ `
    {
      shop {
        name
      }
    }
  `;

  try {
    const data = await shopifyClient.request(testQuery);
    console.log("Shopify connection OK:", data);
  } catch (err) {
    console.error("Shopify connection FAILED:", err);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Shopify Headless Frontend
        </h1>

        <p className="text-muted-foreground">
          Headless Next.js + TypeScript storefront consuming Shopify&apos;s
          Storefront GraphQL API. This is the starting point for a production-style
          e-commerce frontend: catalog, cart & checkout, and a rich My Account
          experience.
        </p>
      </div>
    </main>
  );
}
