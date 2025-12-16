import type { Template } from './types';
import { nanoid } from 'nanoid';

export const eventsTemplate: Template = {
  key: 'events-01',
  name: 'Modern Events',
  businessType: 'events',
  defaultTheme: {
    primaryColor: '#111827',
    accentColor: '#7C3AED',
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
            eyebrow: 'Event styling & rentals',
            title: 'Turn special moments into unforgettable experiences.',
            subtitle:
              'From intimate gatherings to large celebrations, we design and deliver beautifully styled events.',
            primaryCtaLabel: 'View services',
            primaryCtaHref: '/services',
            secondaryCtaLabel: 'See gallery',
            secondaryCtaHref: '#gallery',
          },
        },
        {
          id: nanoid(),
          type: 'events.servicesList',
          data: {
            heading: 'Our services',
            subheading: 'Choose the level of support that fits your event.',
            services: [
              {
                name: 'Full event styling',
                description:
                  'Complete design, setup and teardown for your event.',
                priceLabel: 'From £800',
                badge: 'Most popular',
              },
              {
                name: 'Decor & props hire',
                description: 'Hire selected pieces to elevate your own setup.',
                priceLabel: 'From £200',
              },
              {
                name: 'On-the-day coordination',
                description:
                  'We handle everything so you can enjoy your event.',
                priceLabel: 'From £400',
              },
            ],
          },
        },
        {
          id: nanoid(),
          type: 'events.gallery',
          data: {
            heading: 'Recent events',
            images: [
              { url: '/placeholder/600x600.png' },
              { url: '/placeholder/600x600.png' },
              { url: '/placeholder/600x600.png' },
              { url: '/placeholder/600x600.png' },
            ],
          },
        },
        {
          id: nanoid(),
          type: 'events.enquiryCta',
          data: {
            heading: 'Let’s plan your event',
            body: 'Tell us about your event and we’ll help bring your vision to life.',
            primaryLabel: 'Make an enquiry',
            primaryHref: '/checkout',
          },
        },
      ],
    },
    {
      kind: 'services',
      path: '/services',
      layout: [
        {
          id: nanoid(),
          type: 'events.servicesList',
          data: {
            heading: 'Services & packages',
            subheading: 'Flexible options designed around your needs.',
            services: [
              {
                name: 'Weddings',
                description: 'Full styling and coordination for weddings.',
                priceLabel: 'Custom pricing',
              },
              {
                name: 'Corporate events',
                description: 'Professional styling for launches and events.',
                priceLabel: 'Custom pricing',
              },
              {
                name: 'Private parties',
                description: 'Birthdays, celebrations and intimate gatherings.',
                priceLabel: 'From £500',
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
          type: 'checkout.eventDateSelector',
          data: {
            heading: 'Select your event date',
          },
        },
        {
          id: nanoid(),
          type: 'checkout.checkoutForm',
          data: {
            showShippingSection: false,
            showBillingSection: false,
            showNotesField: true,
          },
        },
      ],
    },
  ],
};
