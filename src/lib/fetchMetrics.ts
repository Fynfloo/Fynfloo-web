import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export async function fetchMetrics(tenantId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${API_BASE}/api/tenant/${tenantId}/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: 'no-store',
  });

  if (res.status === 401) {
    // not logged in → send back to login
    redirect('/login');
  }

  if (!res.ok) {
    throw new Error('Failed to load metrics');
  }

  return res.json();
}
