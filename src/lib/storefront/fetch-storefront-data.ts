import type { Store, StorePage, Product, Cart } from './types';
import { apiUrl } from '../utils';
import { getBaseUrl } from './get-base-url';

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

export async function addToCart(productId: string, quantity = 1) {
  const res = await fetch('/api/cart/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    throw new Error('Failed to add item to cart');
  }

  return res.json();
}
