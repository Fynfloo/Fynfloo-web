import { Product } from '@/lib/storefront/get-storefront-data';
import { ProductCard } from './product-card';

type Props = {
  products: Product[];
  baseHref: string;
};

export function ProductGrid({ products, baseHref }: Props) {
  if (!products.length) {
    return (
      <p className="text-sm text-slate-400">
        No products found yet. Add some via the admin to see them here.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} href={`${baseHref}/${p.handle}`} />
      ))}
    </div>
  );
}
