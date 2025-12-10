import type { Store, StorePage, Product, Cart } from './types';
import { apiUrl } from '../utils';

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

export async function fetchCart(
  storeId: string,
  cookieHeader?: string | null
): Promise<Cart> {
  const res = await fetch(`${apiUrl}/api/storefront/stores/${storeId}/cart`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    cache: 'no-store',
  });
  if (!res.ok) {
    return { items: [], subtotal: 0, total: 0 };
  }
  return res.json();
}
