import useSWR from "swr";
import { shopifyClient } from "./graphql-client";

type Variables = Record<string, unknown> | undefined;

const fetcher =
  <TData>(query: string, variables?: Variables) =>
  async () =>
    shopifyClient.request<TData>(query, variables);

export function useShopifyQuery<TData>(
  key: [string, Variables] | null,
  query: string,
  variables?: Variables,
) {
  const { data, error, isLoading, mutate } = useSWR<TData>(
    key,
    fetcher<TData>(query, variables),
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
