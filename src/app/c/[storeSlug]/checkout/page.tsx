import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/lib/storefront/cart-context';
import { RenderPage } from '@/components/storefront/render-page';
import { fetchCartServer } from '@/lib/storefront/cartApi.server';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;

  const ctx = await loadStoreContext(storeSlug, '/checkout');
  if (!ctx) {
    notFound();
  }

  const cart = await fetchCartServer(storeSlug);

  return (
    <CartProvider initialCart={cart}>
      <RenderPage layout={ctx.layout} />
    </CartProvider>
  );
}
