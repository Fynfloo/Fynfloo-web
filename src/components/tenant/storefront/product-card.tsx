// components/storefront/product-card.tsx
import Link from 'next/link';
import { Product } from '@/lib/storefront/get-storefront-data';
import { ProductBadgePill } from './badges';

type Props = {
  product: Product;
  href: string;
};

export function ProductCard({ product, href }: Props) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden hover:border-slate-600 hover:shadow-xl hover:shadow-slate-900/40 transition-all"
    >
      <div className="aspect-square overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-slate-50">{product.name}</h3>
          <ProductBadgePill badge={product.badge} />
        </div>

        <p className="text-xs text-slate-400 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-semibold text-slate-50">
            £{product.price.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-500">
            ★ {product.rating.toFixed(1)} · {product.reviewsCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
