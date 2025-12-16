import type { Template } from './types';
import { nanoid } from 'nanoid';

export const foodTemplate: Template = {
  key: 'food-01',
  name: 'Modern Food',
  businessType: 'food',
  defaultTheme: {
    primaryColor: '#065F46',
    accentColor: '#F59E0B',
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
            eyebrow: 'Freshly prepared',
            title: 'Food you’ll look forward to ordering.',
            subtitle:
              'Comforting favourites and seasonal specials made with care.',
            primaryCtaLabel: 'View menu',
            primaryCtaHref: '/menu',
          },
        },
        {
          id: nanoid(),
          type: 'food.menuList',
          data: {
            heading: 'Popular dishes',
            sections: [
              {
                name: 'Most ordered',
                items: [
                  { name: 'House special', price: '£12.00' },
                  { name: 'Chef’s pasta', price: '£10.50' },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      kind: 'menu',
      path: '/menu',
      layout: [
        {
          id: nanoid(),
          type: 'food.menuList',
          data: {
            heading: 'Full menu',
            sections: [
              {
                name: 'Starters',
                items: [
                  { name: 'Garlic bread', price: '£4.50' },
                  { name: 'Soup of the day', price: '£5.00' },
                ],
              },
              {
                name: 'Mains',
                items: [
                  { name: 'Grilled chicken', price: '£13.00' },
                  { name: 'Vegetarian curry', price: '£11.50' },
                ],
              },
            ],
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
          type: 'checkout.deliveryTimeSelector',
          data: {
            heading: 'Choose delivery or collection time',
          },
        },
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
