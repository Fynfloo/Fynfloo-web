import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8080';

export type DashboardMetrics = {
  metrics: {
    ordersCount: number;
    usersCount: number;
    revenue: number;
  };
};

export async function fetchTenantMetrics(
  tenantId: string
): Promise<DashboardMetrics> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${API_BASE}/api/tenant/${tenantId}/dashboard`, {
    headers: { cookie: cookieHeader },
    cache: 'no-store',
    credentials: 'include',
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
