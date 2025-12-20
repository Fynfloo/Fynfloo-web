import type { BusinessType } from '../storefront/types';

export type TemplateMeta = {
  key: string;
  name: string;
  description: string;
  businessType: BusinessType;
  previewImageUrl?: string;
};

export const TEMPLATE_REGISTRY: TemplateMeta[] = [
  {
    key: 'fashion-01',
    name: 'Modern Fashion',
    description: 'Designed for apparel and lifestyle brands.',
    businessType: 'fashion',
  },
  {
    key: 'beauty-01',
    name: 'Modern Beauty',
    description: 'Perfect for skincare and beauty stores.',
    businessType: 'beauty',
  },
  {
    key: 'food-01',
    name: 'Modern Food',
    description: 'Menus, ordering, and delivery flows.',
    businessType: 'food',
  },
  {
    key: 'events-01',
    name: 'Event Services',
    description: 'Bookings, packages, and enquiries.',
    businessType: 'events',
  },
  {
    key: 'general-01',
    name: 'General Store',
    description: 'A flexible starting point for any business.',
    businessType: 'general',
  },
];
