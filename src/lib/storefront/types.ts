// Basic shapes;

export type BusinessType = 'fashion' | 'beauty' | 'food' | 'events' | 'general';

export type ThemeSettings = {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  radius: 'sm' | 'md' | 'lg' | 'full';
  fontFamily: 'system' | 'serif' | 'mono';
};

export type Store = {
  id: string;
  slug: string;
  name: string;
  businessType: BusinessType;
  templateKey: string;
  themeSettings: ThemeSettings;
};

export type StorePage = {
  id: string;
  storeId: string;
  path: string;
  kind:
    | 'home'
    | 'products'
    | 'product'
    | 'menu'
    | 'services'
    | 'cart'
    | 'checkout';
  layout: unknown;
};

export type Product = {
  id: string;
  handle: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images: { url: string; alt?: string }[];
  badges?: string[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  image?: {
    url: string;
    alt?: string;
  };
  price: number; // in pounds
  quantity: number;
  lineTotal: number; // price * quantity
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping?: number | null;
  tax?: number | null;
  total: number;
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone?: string;
};

export type CheckoutShipping = {
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type CheckoutData = {
  customer?: CheckoutCustomer;
  shipping?: CheckoutShipping;
  notes?: string;
};
