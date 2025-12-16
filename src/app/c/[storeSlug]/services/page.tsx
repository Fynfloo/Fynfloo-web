import { notFound } from 'next/navigation';
import { loadStoreContext } from '@/lib/storefront/load-store-context';
import { RenderPage } from '@/components/storefront/render-page';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;

  const ctx = await loadStoreContext(storeSlug, '/services');
  if (!ctx) {
    notFound();
  }

  return <RenderPage layout={ctx.layout} />;
}
