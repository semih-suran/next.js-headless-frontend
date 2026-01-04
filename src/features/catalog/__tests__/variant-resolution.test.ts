import { renderHook } from "@testing-library/react";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

type Product = {
  options?: { name: string; values: string[] }[];
  variants?: { nodes: Variant[] };
};

function deriveAutoVariant(product: Product | null) {
  if (!product) return null;

  const single = product.variants?.nodes?.[0];
  const hasNoOptions = !product.options || product.options.length === 0;
  const onlyOneVariant =
    !!product.variants?.nodes && product.variants.nodes.length === 1;

  if (hasNoOptions && onlyOneVariant && single) {
    return single;
  }

  return null;
}

describe("Variant auto-resolution behaviour", () => {
  it("auto-resolves when there is exactly one variant and no options", () => {
    const product: Product = {
      options: [],
      variants: {
        nodes: [{ id: "v1", title: "Default", availableForSale: true }],
      },
    };

    const { result } = renderHook(() => deriveAutoVariant(product));
    expect(result.current?.id).toBe("v1");
  });

  it("does NOT auto-resolve when multiple variants exist", () => {
    const product: Product = {
      options: [],
      variants: {
        nodes: [
          { id: "v1", title: "A", availableForSale: true },
          { id: "v2", title: "B", availableForSale: true },
        ],
      },
    };

    const { result } = renderHook(() => deriveAutoVariant(product));
    expect(result.current).toBeNull();
  });

  it("does NOT auto-resolve when options exist (user must choose)", () => {
    const product: Product = {
      options: [{ name: "Size", values: ["S", "M"] }],
      variants: {
        nodes: [{ id: "v1", title: "S", availableForSale: true }],
      },
    };

    const { result } = renderHook(() => deriveAutoVariant(product));
    expect(result.current).toBeNull();
  });
});