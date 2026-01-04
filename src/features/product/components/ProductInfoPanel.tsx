"use client";

type Props = {
  title: string;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  description?: string | null;
};

export function ProductInfoPanel({ title, price, description }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>

      {price && (
        <p className="text-lg font-semibold">
          {price.amount} {price.currencyCode}
        </p>
      )}

      {description && (
        <p className="text-sm leading-relaxed opacity-90">{description}</p>
      )}

      <div className="mt-4 p-3 border rounded bg-gray-50">
        <p className="text-sm opacity-80 mb-2">
          Purchase actions coming soon
        </p>

        <button
          disabled
          className="border px-4 py-2 rounded opacity-60 cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}