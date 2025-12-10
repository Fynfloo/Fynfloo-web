import { fetchStoreBySlug, fetchStorePage } from './fetch-storefront-data';
import { resolveTheme } from '../theme/resolve-theme';
import type { PageLayout } from '../sections/types';

export async function loadStoreContext(storeSlug: string, path: string) {
  const store = await fetchStoreBySlug(storeSlug);

  if (!store) {
    return null;
  }

  const page = await fetchStorePage(store.id, path);

  const layout: PageLayout = (page?.layout ?? []) as PageLayout;

  const theme = resolveTheme(store.themeSettings);

  return {
    store,
    page,
    layout,
    theme,
  };
}
