import type { Cart } from './types';
import { getBaseUrl } from './get-base-url';

export async function fetchCart(): Promise<Cart> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/cart`, {
    credentials: 'include',
    cache: 'no-store',
  });
  if (!res.ok) {
    return { id: '', items: [], subtotal: 0, total: 0 };
  }
  return res.json();
}
