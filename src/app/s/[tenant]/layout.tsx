import type { ReactNode } from 'react';
import { getStorefrontData } from '@/lib/storefront/get-storefront-data';
import { StoreShell } from '@/components/tenant/storefront/store-shell';

export default async function TenantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const data = await getStorefrontData(tenant);

  return <StoreShell tenant={data.tenant}>{children}</StoreShell>;
}
