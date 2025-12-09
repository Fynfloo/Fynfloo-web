import { fetchTenantById } from '@/lib/fetch-tenant-by-id';
import { notFound } from 'next/navigation';
import StoreContextProvider from '@/context/StoreContext';
import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import StoreTabs from '@/components/dashboard/store-tabs';

export default async function StoreLayout({
  params,
  children,
}: {
  params: Promise<{ storeId: string }>;
  children: React.ReactNode;
}) {
  const { storeId } = await params;
  const store = await fetchTenantById(storeId);
  if (!store) return notFound();

  return (
    <StoreContextProvider store={store}>
      <div className="space-y-6">
        <Breadcrumbs
          trail={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Stores', href: '/dashboard/stores' },
            { label: store.name, href: `/dashboard/stores/${storeId}` },
          ]}
        />
        <h1 className="text-2xl font-bold">{store.name}</h1>
        <StoreTabs storeId={store.id} />
        <div>{children}</div>
      </div>
    </StoreContextProvider>
  );
}
