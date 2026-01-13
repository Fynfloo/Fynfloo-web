import type { Store, StorePage, Product, Cart } from './types';
import { apiUrl } from '../utils';
import { getStoreSlugFromHostClient } from './storeSlug.client';
import { getCartTokenClient, setCartTokenClient } from './cartToken.client';

type CartResponse = { cartToken: string; cart: Cart };

export async function fetchStoreBySlug(slug: string): Promise<Store | null> {
  const res = await fetch(`${apiUrl}/api/storefront/stores/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchStorePage(
  storeId: string,
  path: string
): Promise<StorePage | null> {
  const res = await fetch(
    `${apiUrl}/api/storefront/stores/${storeId}/pages?path=${encodeURIComponent(
      path
    )}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function fetchProductByHandle(storeId: string, handle: string) {
  const res = await fetch(
    `${apiUrl}/api/storefront/stores/${storeId}/products/${handle}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function fetchProductsForListing(
  storeId: string,
  params: Record<string, string | undefined> = {}
): Promise<Product[]> {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null) as [string, string][]
  );
  const res = await fetch(
    `${apiUrl}/api/storefront/stores/${storeId}/products?${qs.toString()}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCartClient(): Promise<Cart> {
  const storeSlug = getStoreSlugFromHostClient();
  const cartToken = getCartTokenClient();

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
  if (data.cartToken) setCartTokenClient(data.cartToken);
  return data.cart;
}

export async function addToCartClient(
  productId: string,
  quantity = 1
): Promise<Cart> {
  const storeSlug = getStoreSlugFromHostClient();
  const cartToken = getCartTokenClient();

  const res = await fetch(`${apiUrl}/api/storefront/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Store-Slug': storeSlug,
      ...(cartToken ? { 'X-Cart-Token': cartToken } : {}),
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) throw new Error('Failed to add to cart');
  const data = (await res.json()) as CartResponse;
  if (data.cartToken) setCartTokenClient(data.cartToken);
  return data.cart;
}
