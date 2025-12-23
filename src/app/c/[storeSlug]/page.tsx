import { RenderPage } from '@/components/storefront/render-page';
import { extractCollectionHandles } from '@/lib/storefront/extract-collections';
import { fetchProductsForListing } from '@/lib/storefront/fetch-storefront-data';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { ProductsListingProvider } from '@/lib/storefront/products-listing-context';
import { notFound } from 'next/navigation';

export default async function StoreHome({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const ctx = await loadStoreContext(storeSlug, '/');

  if (!ctx) {
    return notFound();
  }

  const collectionHandles = extractCollectionHandles(ctx.layout);

  const [allProducts, ...collectionResults] = await Promise.all([
    fetchProductsForListing(ctx.store.id),
    ...collectionHandles.map((handle) =>
      fetchProductsForListing(ctx.store.id, { collectionHandle: handle })
    ),
  ]);

  const byCollection = Object.fromEntries(
    collectionHandles.map((handle, index) => [handle, collectionResults[index]])
  );

  return (
    <ProductsListingProvider value={{ all: allProducts, byCollection }}>
      <RenderPage layout={ctx.layout} />
    </ProductsListingProvider>
  );
}
