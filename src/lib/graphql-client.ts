import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
    "Content-Type": "application/json",
  },
});
