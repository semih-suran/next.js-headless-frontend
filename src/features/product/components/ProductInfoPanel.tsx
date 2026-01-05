"use client";

type Props = {
  title: string;
  price: {
    amount?: string;
    currencyCode?: string;
  };
  description?: string | null;
  isReady: boolean;
  cta?: React.ReactNode;
};

export function ProductInfoPanel({ title, price, description, cta }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>

      <p className="text-sm opacity-70">
        {price.amount} {price.currencyCode}
      </p>

      {description && (
        <p className="text-sm leading-relaxed">{description}</p>
      )}

      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}