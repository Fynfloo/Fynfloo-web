import { RenderPage } from '@/components/storefront/render-page';
import { CartProvider } from '@/lib/storefront/cart-context';
import { fetchCart } from '@/lib/storefront/fetch-storefront-data';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function CartPage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const ctx = await loadStoreContext(storeSlug, '/cart');
  if (!ctx) {
    notFound();
  }

  return <RenderPage layout={ctx.layout} />;
}
