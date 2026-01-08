import Link from 'next/link';
import Image from 'next/image';
import { ProductSummary } from '../types';

interface ProductGridProps {
  products: ProductSummary[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.handle}`}
          className="group block"
        >
          <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg mb-4">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                No Image
              </div>
            )}
            
            {!product.availableForSale && (
              <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                SOLD OUT
              </div>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.priceRange.minVariantPrice.currencyCode,
            }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
          </p>
        </Link>
      ))}
    </div>
  );
}