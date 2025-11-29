import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export async function fetchTenant(tenantSlug: string) {
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
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load tenant');
  return res.json();
}
