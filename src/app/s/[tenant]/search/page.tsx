import {
  getStorefrontData,
  searchProducts,
} from '@/lib/storefront/get-storefront-data';
import { ProductGrid } from '@/components/tenant/storefront/product-grid';

// TODO: Pagination, filters, sorting, etc.
export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { tenant } = await params;
  const { query } = await searchParams;

  const [store, results] = await Promise.all([
    getStorefrontData(tenant),
    searchProducts(tenant, query || ''),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-50">Search</h1>
        <p className="text-sm text-slate-400">
          Search across {store.tenant.name}&apos;s current products. Real
          indexing will use the backend later.
        </p>
      </header>

      <form className="flex gap-2">
        <input
          name="query"
          defaultValue={query || ''}
          placeholder="Search products..."
          className="flex-1 rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500"
        />
        <button className="rounded-full bg-slate-50 text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-200">
          Search
        </button>
      </form>

      {query && (
        <p className="text-xs text-slate-400">
          Showing results for <span className="text-slate-100">“{query}”</span>
        </p>
      )}

      <ProductGrid products={results} baseHref={`/s/${tenant}/products`} />
    </div>
  );
}
