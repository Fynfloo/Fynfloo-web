import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  template: string | null;
};

export async function fetchTenantBySlug(
  tenantSlug: string
): Promise<Tenant | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(
    `${API_BASE}/api/tenant/by-slug/${encodeURIComponent(tenantSlug)}`,
    {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load tenant');
  return res.json();
}
