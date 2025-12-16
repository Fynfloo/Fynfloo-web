import { RenderPage } from '@/components/storefront/render-page';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { notFound } from 'next/navigation';

export default async function StoreHome({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const ctx = await loadStoreContext(storeSlug, '/');

  if (!ctx) {
    return notFound();
  }

  return <RenderPage layout={ctx.layout} />;
}
