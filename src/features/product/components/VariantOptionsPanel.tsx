"use client";

type Props = {
  options?: {
    name: string;
    values: string[];
  }[];
};

export function VariantOptionsPanel({ options }: Props) {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {options.map((opt) => (
        <div key={opt.name} className="flex flex-col gap-1">
          <p className="text-sm font-medium">{opt.name}</p>

          <div className="flex flex-wrap gap-2">
            {opt.values.map((v) => (
              <button
                key={v}
                disabled
                className="px-3 py-1 border rounded text-sm opacity-70 cursor-not-allowed"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}