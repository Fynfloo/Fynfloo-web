import { cookies } from 'next/headers';
import { apiUrl } from './utils';

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  template: string | null;
};

export async function fetchTenantById(
  tenantId: string
): Promise<Tenant | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  const res = await fetch(
    `${apiUrl}/api/tenant/${encodeURIComponent(tenantId)}`,
    {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
      credentials: 'include',
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load tenant');
  return res.json();
}
