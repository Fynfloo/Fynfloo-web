export type StorefrontTenant = {
  id: string;
  slug: string;
  name: string;
  logoText: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  darkAccentColor: string;
};

export type ProductBadge = 'new' | 'bestseller' | 'limited';

export type Product = {
  id: string;
  handle: string;
  name: string;
  price: number;
  badge?: ProductBadge;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];
  inStock: boolean;
  rating: number; // 0 - 5
  reviewsCount: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarInitials: string;
};

export type FeatureRow = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bulletPoints: string[];
  image: string;
  imageAlt: string;
  align: 'left' | 'right';
};

export type StorefrontData = {
  tenant: StorefrontTenant;
  featuredProducts: Product[];
  allProducts: Product[];
  testimonials: Testimonial[];
  featureRows: FeatureRow[];
};

const baseProducts: Product[] = [
  {
    id: 'p1',
    handle: 'midnight-desk-lamp',
    name: 'Midnight Desk Lamp',
    price: 79,
    badge: 'bestseller',
    image: '/tenant/images/midnight-desk-lamp.png',
    images: ['/tenant/images/midnight-desk-lamp.png'],
    shortDescription: 'A soft, focused glow for deep work.',
    description:
      'Designed for modern workspaces, the Midnight Desk Lamp combines anodised aluminium with a warm, focused beam. Adjustable arm, touch dimmer, and USB-C passthrough keep your desk clean and considered.',
    category: 'Lighting',
    tags: ['lamp', 'desk', 'workspace'],
    inStock: true,
    rating: 4.8,
    reviewsCount: 128,
  },
  {
    id: 'p2',
    handle: 'arc-wireless-mouse',
    name: 'Arc Wireless Mouse',
    price: 59,
    badge: 'new',
    image: '/tenant/images/arc-wireless-mouse.png',
    images: ['/tenant/images/arc-wireless-mouse.png'],
    shortDescription: 'Minimal, sculpted, and whisper-quiet.',
    description:
      'Ergonomic, ultra-low-latency wireless mouse with 4 programmable buttons, silent switches, and multi-device pairing. Subtle haptics and a matte finish make it feel invisible until you need it.',
    category: 'Accessories',
    tags: ['mouse', 'wireless'],
    inStock: true,
    rating: 4.6,
    reviewsCount: 76,
  },
  {
    id: 'p3',
    handle: 'silk-desk-mat',
    name: 'Silk Desk Mat',
    price: 39,
    badge: 'limited',
    image: '/tenant/images/silk-desk-mat.png',
    images: ['/tenant/images/silk-desk-mat.png'],
    shortDescription: 'Soft-touch surface with stitched edges.',
    description:
      'A desk mat that anchors your workspace. Silk-smooth top layer, grippy base, and stitched edges to prevent fraying. Sized for your keyboard, mouse, and notebook.',
    category: 'Workspace',
    tags: ['mat', 'desk'],
    inStock: false,
    rating: 4.7,
    reviewsCount: 54,
  },
];

const baseTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Rivera',
    role: 'Product Designer',
    quote:
      'Everything feels intentional. It looks like Apple hardware but priced like something I can actually buy.',
    avatarInitials: 'AR',
  },
  {
    id: 't2',
    name: 'Jordan Blake',
    role: 'Developer & Writer',
    quote:
      'My desk finally matches the way I want to feel when I sit down to work. Calm, focused, and a little bit fancy.',
    avatarInitials: 'JB',
  },
  {
    id: 't3',
    name: 'Sam Okafor',
    role: 'Founder, Studio North',
    quote:
      'The unboxing felt like opening a new phone. The products live on my desk; the packaging lives in my moodboard folder.',
    avatarInitials: 'SO',
  },
  {
    id: 't4',
    name: 'Jordan Blake',
    role: 'Developer & Writer',
    quote:
      'My desk finally matches the way I want to feel when I sit down to work. Calm, focused, and a little bit fancy.',
    avatarInitials: 'JB',
  },
];

const baseFeatureRows: FeatureRow[] = [
  {
    id: 'f1',
    eyebrow: 'Crafted for focus',
    title: 'A calmer desk in under ten minutes.',
    body: 'Each piece is chosen to remove noise from your workspace — visually and mentally. Neutral colours, soft curves, and small tactile details you notice every day.',
    bulletPoints: [
      'Soft-touch materials that age gracefully',
      'Warm, human-scale lighting temperatures',
      'Hardware that feels premium but never loud',
    ],
    image: '/tenant/images/calmer-desk.png',
    imageAlt: 'Minimal desk setup with soft lighting',
    align: 'left',
  },
  {
    id: 'f2',
    eyebrow: 'Built to last',
    title: 'Fewer things. Better things.',
    body: 'We focus on a narrow range of products and iterate. The result: fewer, better options that we know inside-out and support for years.',
    bulletPoints: [
      'Two-year standard warranty on every product',
      'Spare parts and repairs for common issues',
      'Designed with disassembly and recycling in mind',
    ],
    image: '/tenant/images/built-to-last.png',
    imageAlt: 'Product close-up with aluminium and fabric',
    align: 'right',
  },
];

const defaultTenant: StorefrontTenant = {
  id: 'demo-tenant',
  slug: 'demo',
  name: 'Fynfloo Studio',
  logoText: 'fynfloo.',
  tagline: 'Beautiful commerce for bold, independent brands.',
  primaryColor: '#020617',
  accentColor: '#38bdf8',
  darkAccentColor: '#0f172a',
};

export function getMockStorefrontData(slug: string): StorefrontData {
  // In future you can switch on slug here for different tenants/themes
  const tenant = { ...defaultTenant, slug };
  return {
    tenant,
    featuredProducts: baseProducts,
    allProducts: baseProducts,
    testimonials: baseTestimonials,
    featureRows: baseFeatureRows,
  };
}
