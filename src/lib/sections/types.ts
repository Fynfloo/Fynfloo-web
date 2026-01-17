import type { BusinessType } from '../storefront/types';

export type SectionType =
  | 'hero.basic'
  | 'content.textWithMedia'
  | 'content.testimonialsBasic'
  | 'content.faqAccordion'
  | 'commerce.productGrid'
  | 'commerce.productHero'
  | 'commerce.productSpecs'
  | 'commerce.relatedProducts'
  | 'food.menuList'
  | 'events.servicesList'
  | 'events.gallery'
  | 'events.packagesPricing'
  | 'events.enquiryCta'
  | 'checkout.cartItems'
  | 'checkout.cartSummary'
  | 'checkout.checkoutForm'
  | 'checkout.deliveryTimeSelector'
  | 'checkout.eventDateSelector'
  | 'checkout.checkoutSummary';

/** ==== section data shapes ==== */

export type HeroBasicData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
};

export type TextWithMediaData = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: { url: string; alt?: string };
  imagePosition?: 'left' | 'right';
};

export type TestimonialsBasicData = {
  heading?: string;
  testimonials: { quote: string; name: string; role?: string }[];
};

export type FaqAccordionData = {
  heading?: string;
  items: { question: string; answer: string }[];
};

export type ProductGridData = {
  heading?: string;
  subheading?: string;
  collectionHandle?: string | null;
  layout?: 'grid' | 'carousel';
  columns?: 2 | 3 | 4;
};

export type ProductHeroData = {
  showBreadcrumbs?: boolean;
  showBadges?: boolean;
};

export type ProductSpecsData = {
  showDescription?: boolean;
  showDetailsList?: boolean;
};

export type RelatedProductsData = {
  heading?: string;
};

export type MenuListData = {
  heading?: string;
  sections: {
    name: string;
    items: {
      name: string;
      description?: string;
      price?: string;
      badge?: string;
    }[];
  }[];
};

export type ServicesListData = {
  heading?: string;
  subheading?: string;
  services: {
    name: string;
    description?: string;
    priceLabel?: string;
    badge?: string;
  }[];
};

export type GalleryData = {
  heading?: string;
  images: { url: string; alt?: string }[];
};

export type PackagesPricingData = {
  heading?: string;
  packages: {
    name: string;
    priceLabel?: string;
    description?: string;
    features?: string[];
    highlight?: boolean;
  }[];
};

export type EnquiryCtaData = {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type CartItemsData = {
  showThumbnails?: boolean;
  showLineTotals?: boolean;
};

export type CartSummaryData = {
  showDiscountCode?: boolean;
};

export type CheckoutFormData = {
  showShippingSection?: boolean;
  showBillingSection?: boolean;
  showNotesField?: boolean;
};

export type DeliveryTimeSelectorData = {
  heading?: string;
};

export type EventDateSelectorData = {
  heading?: string;
};

export type CheckoutSummaryData = {
  payButtonLabel: string;
};

export interface SectionDataMap {
  'hero.basic': HeroBasicData;
  'content.textWithMedia': TextWithMediaData;
  'content.testimonialsBasic': TestimonialsBasicData;
  'content.faqAccordion': FaqAccordionData;
  'commerce.productGrid': ProductGridData;
  'commerce.productHero': ProductHeroData;
  'commerce.productSpecs': ProductSpecsData;
  'commerce.relatedProducts': RelatedProductsData;
  'food.menuList': MenuListData;
  'events.servicesList': ServicesListData;
  'events.gallery': GalleryData;
  'events.packagesPricing': PackagesPricingData;
  'events.enquiryCta': EnquiryCtaData;
  'checkout.cartItems': CartItemsData;
  'checkout.cartSummary': CartSummaryData;
  'checkout.checkoutForm': CheckoutFormData;
  'checkout.deliveryTimeSelector': DeliveryTimeSelectorData;
  'checkout.eventDateSelector': EventDateSelectorData;
  'checkout.checkoutSummary': CheckoutSummaryData;
}

export type PageKind =
  | 'home'
  | 'products'
  | 'product'
  | 'menu'
  | 'services'
  | 'cart'
  | 'checkout';

export type SectionInstance<T extends SectionType = SectionType> = {
  id: string;
  type: T;
  data: SectionDataMap[T];
};

export type PageLayout = SectionInstance[];

export type SectionDefaultContext = {
  businessType: BusinessType;
  pageKind: PageKind;
};
