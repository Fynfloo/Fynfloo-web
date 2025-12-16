import type { Template } from './types';
import { nanoid } from 'nanoid';

export const generalTemplate: Template = {
  key: 'general-01',
  name: 'Modern Store',
  businessType: 'general',
  defaultTheme: {
    primaryColor: '#1F2937',
    accentColor: '#3B82F6',
  },
  pages: [
    {
      kind: 'home',
      path: '/',
      layout: [
        {
          id: nanoid(),
          type: 'hero.basic',
          data: {
            eyebrow: 'Welcome',
            title: 'Everything you need, all in one place.',
            subtitle:
              'A simple, flexible storefront built to support your business.',
            primaryCtaLabel: 'Browse products',
            primaryCtaHref: '/products',
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: 'Featured products',
            subheading: '',
            collectionHandle: 'featured',
            layout: 'grid',
            columns: 3,
          },
        },
      ],
    },
    {
      kind: 'products',
      path: '/products',
      layout: [
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: 'All products',
            subheading: '',
            collectionHandle: null,
            layout: 'grid',
            columns: 3,
          },
        },
      ],
    },
    {
      kind: 'product',
      path: '/product/[handle]',
      layout: [
        {
          id: nanoid(),
          type: 'commerce.productHero',
          data: {
            showBreadcrumbs: true,
            showBadges: false,
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productSpecs',
          data: {
            showDescription: true,
            showDetailsList: false,
          },
        },
      ],
    },
    {
      kind: 'cart',
      path: '/cart',
      layout: [
        {
          id: nanoid(),
          type: 'checkout.cartItems',
          data: {
            showThumbnails: true,
            showLineTotals: true,
          },
        },
        {
          id: nanoid(),
          type: 'checkout.cartSummary',
          data: {
            showDiscountCode: true,
          },
        },
      ],
    },
    {
      kind: 'checkout',
      path: '/checkout',
      layout: [
        {
          id: nanoid(),
          type: 'checkout.checkoutForm',
          data: {
            showShippingSection: true,
            showBillingSection: false,
            showNotesField: true,
          },
        },
      ],
    },
  ],
};
