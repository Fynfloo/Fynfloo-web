import { notFound } from 'next/navigation';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { RenderPage } from '@/components/storefront/render-page';
import { ProductsListingProvider } from '@/lib/storefront/products-listing-context';
import { fetchProductsForListing } from '@/lib/storefront/fetch-storefront-data';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const ctx = await loadStoreContext(storeSlug, '/products');
  if (!ctx) {
    return notFound();
  }

  const allProducts = await fetchProductsForListing(ctx.store.id);

  return (
    <ProductsListingProvider value={{ all: allProducts, byCollection: {} }}>
      <RenderPage layout={ctx.layout} />
    </ProductsListingProvider>
  );
}
