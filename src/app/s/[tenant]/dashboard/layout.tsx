import { ReactNode } from 'react';
import { TenantSidebar } from '@/components/tenant/sidebar';
import { TenantHeader } from '@/components/tenant/header';

export default async function TenantDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <div className="flex min-h-screen bg-muted/30 w-full">
      <TenantSidebar tenantSlug={tenant} />

      <div className="flex-1 flex flex-col">
        <TenantHeader tenantSlug={tenant} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
