"use client";

type Props = {
  title: string;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  description?: string | null;
  isReady?: boolean;
};

export function ProductInfoPanel({ title, price, description, isReady }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>

      {price?.amount && (
        <p className="text-sm opacity-70">
          {price.amount} {price.currencyCode}
        </p>
      )}

      {description && (
        <p className="text-sm leading-relaxed">{description}</p>
      )}

      <div className="mt-4">
        <button
          disabled={!isReady}
          className={`border px-4 py-2 rounded ${
            isReady
              ? "bg-black text-white"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          {isReady ? "Add to Cart" : "Select options to continue"}
        </button>
      </div>
    </div>
  );
}