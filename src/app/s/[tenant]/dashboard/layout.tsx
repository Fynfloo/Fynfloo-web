import { ReactNode } from 'react';
import { TenantSidebar } from '@/components/tenant/sidebar';
import { TenantHeader } from '@/components/tenant/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function TenantDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30 w-full">
        <TenantSidebar tenantSlug={tenant} />

        <div className="flex-1 flex flex-col">
          <TenantHeader tenantSlug={tenant} />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
