import { getMockStorefrontData, StorefrontData, Product } from './mock-data';

export type { StorefrontData, Product } from './mock-data';

export async function getStorefrontData(
  tenantSlug: string
): Promise<StorefrontData> {
  // TODO: replace with real API call:
  // const res = await fetch(`${API_URL}/public/storefront/${tenantSlug}`, { cache: 'no-store' })
  // return await res.json()
  return getMockStorefrontData(tenantSlug);
}

export async function getProductByHandle(
  tenantSlug: string,
  handle: string
): Promise<Product | null> {
  const data = await getStorefrontData(tenantSlug);
  return data.allProducts.find((p) => p.handle === handle) ?? null;
}

export async function searchProducts(
  tenantSlug: string,
  query: string
): Promise<Product[]> {
  const data = await getStorefrontData(tenantSlug);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return data.allProducts.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}
