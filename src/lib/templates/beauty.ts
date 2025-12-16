import type { Template } from './types';
import { nanoid } from 'nanoid';

export const beautyTemplate: Template = {
  key: 'beauty-01',
  name: 'Modern Beauty',
  businessType: 'beauty',
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
            eyebrow: 'Everyday self-care',
            title: 'Beauty routines made beautifully simple.',
            subtitle:
              'Skincare and beauty essentials designed to fit effortlessly into your daily rituals.',
            primaryCtaLabel: 'Shop bestsellers',
            primaryCtaHref: '/products',
            secondaryCtaLabel: 'Learn more',
            secondaryCtaHref: '#about',
          },
        },
        {
          id: nanoid(),
          type: 'commerce.productGrid',
          data: {
            heading: 'Customer favourites',
            subheading: 'Loved, tried and trusted.',
            collectionHandle: 'bestsellers',
            layout: 'grid',
            columns: 3,
          },
        },
        {
          id: nanoid(),
          type: 'content.textWithMedia',
          data: {
            eyebrow: 'Our philosophy',
            title: 'Thoughtful ingredients. Honest formulations.',
            body: 'We focus on quality ingredients and simple formulations that work with your skin, not against it.',
            image: {
              url: '/placeholder/800x600.png',
            },
            imagePosition: 'right',
          },
        },
        {
          id: nanoid(),
          type: 'content.testimonialsBasic',
          data: {
            heading: 'Why customers keep coming back',
            testimonials: [
              {
                quote: 'My skin has never felt better.',
                name: 'Amelia R.',
              },
              {
                quote: 'Simple, effective and beautifully packaged.',
                name: 'Sophie L.',
              },
              {
                quote: 'I love how gentle everything feels.',
                name: 'Nina K.',
              },
            ],
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
            title: 'All beauty products',
            subtitle:
              'Explore skincare, beauty and everyday essentials designed to support your routine.',
            primaryCtaLabel: '',
            primaryCtaHref: '',
          },
        },
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
            showBadges: true,
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
