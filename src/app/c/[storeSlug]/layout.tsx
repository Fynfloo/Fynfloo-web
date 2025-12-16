import { LayoutShell } from '@/components/storefront/layout-shell';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { StoreProvider } from '@/lib/storefront/store-context';
import { ThemeProvider } from '@/lib/storefront/theme-provider';
import { ReactNode } from 'react';

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;

  const ctx = await loadStoreContext(storeSlug, '/');

  if (!ctx) {
    //TODO: Render a proper 404 page
    return <div>Store not found</div>;
  }

  return (
    <ThemeProvider theme={ctx.theme}>
      <StoreProvider value={{ store: ctx.store, theme: ctx.theme }}>
        <LayoutShell store={ctx.store}>{children}</LayoutShell>
      </StoreProvider>
    </ThemeProvider>
  );
}
