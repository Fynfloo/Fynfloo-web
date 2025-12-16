import type { Template } from './types';
import { nanoid } from 'nanoid';

export const foodTemplate: Template = {
  key: 'food-01',
  name: 'Modern food',
  businessType: 'food',
  defaultTheme: {
    primaryColor: '#1F2937',
    accentColor: '#EC4899',
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
            eyebrow: 'Self care essentials',
            title: 'Beauty that feels as good as it looks.',
            subtitle:
              'Thoughtfully curated skincare and beauty products designed for everyday rituals.',
            primaryCtaLabel: 'Shop bestsellers',
            primaryCtaHref: '/products',
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: 'Customer favourites',
            subheading: 'Loved for a reason.',
            collectionHandle: 'bestsellers',
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
          type: 'hero.basic',
          data: {
            eyebrow: 'Shop',
            title: 'Explore our full range.',
            subtitle: 'Skincare, beauty and everyday essentials.',
            primaryCtaLabel: '',
            primaryCtaHref: '',
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: '',
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
            showBadges: true,
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productSpecs',
          data: {
            showDescription: true,
            showDetailsList: true,
          },
        },
        {
          id: nanoid(),
          type: 'commerce.relatedProducts',
          data: {
            heading: 'Pairs well with',
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
          data: { showDiscountCode: true },
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
        {
          id: nanoid(),
          type: 'checkout.cartSummary',
          data: { showDiscountCode: false },
        },
      ],
    },
  ],
};
