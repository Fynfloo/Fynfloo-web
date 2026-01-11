import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { notFound } from 'next/navigation';
import { fetchCart } from '@/lib/storefront/cart.server';
import { CartProvider } from '@/lib/storefront/cart-context';
import { RenderPage } from '@/components/storefront/render-page';

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

  const cart = await fetchCart();

  return (
    <CartProvider initialCart={cart}>
      <RenderPage layout={ctx.layout} />
    </CartProvider>
  );
}
