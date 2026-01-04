"use client";

import { useState } from "react";

type Props = {
  options?: {
    name: string;
    values: string[];
  }[];
};

export function VariantOptionsPanel({ options }: Props) {
  const [selection, setSelection] = useState<Record<string, string>>({});

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
                    ${isSelected ? "bg-black text-white" : "bg-white"}
                  `}
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