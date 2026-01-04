"use client";

import { useState, useMemo, useEffect } from "react";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

type Props = {
  options?: {
    name: string;
    values: string[];
  }[];
  variants?: Variant[];
  onResolve?: (variant: Variant | null) => void;
};

export function VariantOptionsPanel({ options, variants, onResolve }: Props) {
  const [selection, setSelection] = useState<Record<string, string>>({});

  const resolvedVariant = useMemo(() => {
    if (!variants) return null;

    return (
      variants.find((v) =>
        v.selectedOptions.every(
          (opt) => selection[opt.name] === opt.value
        )
      ) ?? null
    );
  }, [variants, selection]);

  useEffect(() => {
    onResolve?.(resolvedVariant);
  }, [resolvedVariant, onResolve]);

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {options.map((opt) => (
        <div key={opt.name} className="flex flex-col gap-1">
          <p className="text-sm font-medium">{opt.name}</p>

          <div className="flex flex-wrap gap-2">
            {opt.values.map((v) => {
              const isSelected = selection[opt.name] === v;

              return (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    setSelection((prev) => ({ ...prev, [opt.name]: v }))
                  }
                  className={`px-3 py-1 rounded text-sm border
                    ${
                      isSelected
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}