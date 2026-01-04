"use client";

import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="text-sm opacity-80 mb-3">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="underline-offset-2 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}