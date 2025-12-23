import type { PageLayout } from '../sections/types';
import type { ProductGridData } from '../sections/types';

export function extractCollectionHandles(layout: PageLayout): string[] {
  const handles = new Set<string>();

  for (const section of layout) {
    if (
      section.type === 'commerce.productGrid' &&
      typeof (section.data as ProductGridData)?.collectionHandle === 'string'
    ) {
      handles.add((section.data as ProductGridData).collectionHandle!);
    }
  }
  return Array.from(handles);
}
