import type { ReactNode } from 'react';
import { getStorefrontData } from '@/lib/storefront/get-storefront-data';
import { StoreShell } from '@/components/tenant/storefront/store-shell';

export default async function TenantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { tenant: string };
}) {
  const data = await getStorefrontData(params.tenant);

  return <StoreShell tenant={data.tenant}>{children}</StoreShell>;
}
