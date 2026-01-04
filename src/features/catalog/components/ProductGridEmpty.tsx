"use client";

export function ProductGridEmpty() {
  return (
    <div className="mt-10 w-full max-w-2xl text-center space-y-2">
      <p className="font-semibold text-sm">No products found</p>
      <p className="text-sm opacity-70">
        Try adjusting your filters or search terms.
      </p>
    </div>
  );
}
