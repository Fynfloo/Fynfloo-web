export type Tenant = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  template: string | null;
};

export async function fetchTenantBySlug(
  tenant: string
): Promise<Tenant | null> {
  const res = await fetch(`/api/tenant/by-slug/${encodeURIComponent(tenant)}`, {
    credentials: 'include',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load tenant');
  return res.json();
}
