"use client";

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-3 flex flex-col gap-2 bg-white shadow-sm animate-pulse"
        >
          <div className="w-full aspect-square rounded bg-gray-200" />

          <div className="h-3 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/3 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
