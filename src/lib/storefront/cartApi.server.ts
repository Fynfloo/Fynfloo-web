import 'server-only';
import { apiUrl } from '../utils';
import { getCartTokenServer } from './cartToken.server';
import type { Cart } from './types';

type CartResponse = { cartToken: string; cart: Cart };

export async function fetchCartServer(storeSlug: string): Promise<Cart> {
  const cartToken = await getCartTokenServer();

  // SSR is read-only
  if (!cartToken) {
    return { id: '', items: [], subtotal: 0, total: 0 };
  }

  const res = await fetch(`${apiUrl}/api/storefront/cart`, {
    method: 'GET',
    headers: {
      'X-Store-Slug': storeSlug,
      ...(cartToken ? { 'X-Cart-Token': cartToken } : {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) return { id: '', items: [], subtotal: 0, total: 0 };

  const data = (await res.json()) as CartResponse;
  return data.cart;
}
