import { getStorefrontData } from '@/lib/storefront/get-storefront-data';
import { ProductGrid } from '@/components/tenant/storefront/product-grid';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const data = await getStorefrontData(tenant);

  //TODO: Add filters and categories later
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-50">All Products</h1>
        <p className="text-sm text-slate-400">
          Browse the full collection. Filters and categories will be powered by
          the API later.
        </p>
      </header>
      <ProductGrid
        products={data.allProducts}
        baseHref={`/s/${tenant}/products`}
      />
    </div>
  );
}
