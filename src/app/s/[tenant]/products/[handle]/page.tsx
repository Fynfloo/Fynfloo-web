import { notFound } from 'next/navigation';
import {
  getProductByHandle,
  getStorefrontData,
} from '@/lib/storefront/get-storefront-data';
import { ProductBadgePill } from '@/components/tenant/storefront/badges';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ tenant: string; handle: string }>;
}) {
  const { tenant, handle } = await params;

  const [product, store] = await Promise.all([
    getProductByHandle(tenant, handle),
    getStorefrontData(tenant),
  ]);

  if (!product) return notFound();
  // TODO: Expand product details later
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 lg:grid-cols-2">
      {/* Media */}
      <div className="space-y-4">
        <div className="aspect-square rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-xs text-slate-500">
          Imagery managed by {store.tenant.name}. Additional gallery goes here
          when available.
        </p>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-24 self-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ProductBadgePill badge={product.badge} />
            <span className="text-[11px] text-slate-500">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-50">
            {product.name}
          </h1>
          <p className="text-sm text-slate-300">{product.shortDescription}</p>
          <p className="text-xs text-slate-500">
            ★ {product.rating.toFixed(1)} · {product.reviewsCount} reviews
          </p>
        </div>
        <p className="text-xl font-semibold text-slate-50">
          £{product.price.toFixed(2)}
        </p>
        <button className="rounded-full bg-slate-50 text-slate-950 px-5 py-3 text-sm font-medium hover:bg-slate-200">
          Add to cart
        </button>
        <div className="text-sm text-slate-300 space-y-3">
          <p>{product.description}</p>
          <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
            <li>Free UK shipping over £80</li>
            <li>30-day returns</li>
            <li>2-year standard warranty</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
