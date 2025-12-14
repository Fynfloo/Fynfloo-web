import type { Template } from './types';
import { nanoid } from 'nanoid';

export const fashionTemplate: Template = {
  key: 'fashion-01',
  name: 'Modern Fashion',
  businessType: 'fashion',
  defaultTheme: {
    primaryColor: '#111827',
    accentColor: '#F97316',
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
            eyebrow: 'New in',
            title: 'A calmer wardrobe for every day.',
            subtitle:
              'Pieces you can wear on repeat, made from materials that feel good against your skin.',
            primaryCtaLabel: 'Shop new in',
            primaryCtaHref: '/products?collection=new',
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: 'Featured styles',
            subheading: 'A few easy outfits to start with.',
            collectionHandle: 'featured',
            layout: 'grid',
            columns: 4,
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
            eyebrow: 'All products',
            title: 'Everything, in one place.',
            subtitle: 'Filter by category, colour, size and more.',
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
            columns: 4,
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
            heading: 'You might also like',
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
          data: { showThumbnails: true, showLineTotals: true },
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
