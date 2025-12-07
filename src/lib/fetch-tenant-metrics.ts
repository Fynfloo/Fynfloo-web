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
  const res = await fetch(`api/tenant/${tenantId}/dashboard`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to load metrics');
  }

  return res.json();
}
