import type { BusinessType } from '../storefront/types';
import type { PageKind, PageLayout } from '../sections/types';

export type TemplatePage = {
  kind: PageKind;
  path: string;
  layout: PageLayout;
};

export type Template = {
  key: string;
  name: string;
  businessType: BusinessType;
  previewImage?: string;
  defaultTheme: Partial<import('../storefront/types').ThemeSettings>;
  pages: TemplatePage[];
};
