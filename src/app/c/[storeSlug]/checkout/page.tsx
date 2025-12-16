import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchCart } from '@/lib/storefront/fetch-storefront-data';
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

  const cookie = await cookies();
  const cookieHeader = cookie
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const cart = await fetchCart(ctx.store.id, cookieHeader);

  return (
    <CartProvider cart={cart}>
      <RenderPage layout={ctx.layout} />
    </CartProvider>
  );
}
