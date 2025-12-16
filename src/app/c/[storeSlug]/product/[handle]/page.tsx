import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { notFound } from 'next/navigation';
import { RenderPage } from '@/components/storefront/render-page';
import { fetchProductByHandle } from '@/lib/storefront/fetch-storefront-data';
import { ProductProvider } from '@/lib/storefront/product-context';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ storeSlug: string; handle: string }>;
}) {
  const { storeSlug, handle } = await params;

  const [ctx, storeOnly] = await Promise.all([
    loadStoreContext(storeSlug, '/product/[handle]'),
    // lightweight store fetch; could be optimised to avoid double fetch
    // left simple for clarity
    loadStoreContext(storeSlug, '/'),
  ]);

  if (!ctx || !storeOnly) {
    return notFound();
  }

  const product = await fetchProductByHandle(storeOnly.store.id, handle);
  if (!product) {
    return notFound();
  }

  return (
    <ProductProvider product={product}>
      <RenderPage layout={ctx.layout} />
    </ProductProvider>
  );
}
