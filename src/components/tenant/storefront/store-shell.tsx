'use client';

import * as React from 'react';
import { StorefrontTenant } from '@/lib/storefront/mock-data';
import { StoreHeader } from '@/components/tenant/storefront/store-header';
import { StoreFooter } from '@/components/tenant/storefront/store-footer';

type Props = {
  tenant: StorefrontTenant;
  children: React.ReactNode;
};

export function StoreShell({ tenant, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <StoreHeader tenant={tenant} />
      <main className="flex-1">{children}</main>
      <StoreFooter tenant={tenant} />
    </div>
  );
}
