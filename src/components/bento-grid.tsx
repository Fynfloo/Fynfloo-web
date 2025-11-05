//import { Card, CardContent } from '@/components/Card';
import { cn } from '@/lib/utils';
import { Rocket, Settings, ShoppingBag, Wand2 } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accent?: string;
}

interface BentoGridProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const BentoGrid = ({
  title = 'How It Works',
  subtitle = 'From idea to live store in just a few clicks.',
  steps = [
    {
      title: 'Generate Your Store',
      description:
        'Describe your business and let our AI instantly create your storefront.',
      icon: <Wand2 className="size-6 text-pink-500" />,
      accent: 'from-pink-100 to-pink-200',
    },
    {
      title: 'Customize Your Look',
      description: 'Edit text, colors, and layout visually — no code needed.',
      icon: <Settings className="size-6 text-indigo-500" />,
      accent: 'from-indigo-100 to-indigo-200',
    },
    {
      title: 'Add Products & Payments',
      description:
        'Easily upload products, connect Stripe or Paystack, and start selling.',
      icon: <ShoppingBag className="size-6 text-blue-500" />,
      accent: 'from-blue-100 to-blue-200',
    },
    {
      title: 'Launch Instantly',
      description:
        'Go live with a single click. Your store is fast, secure, and mobile-ready.',
      icon: <Rocket className="size-6 text-purple-500" />,
      accent: 'from-purple-100 to-purple-200',
    },
  ],
}: BentoGridProps) => {
  return <section></section>;
};

export { BentoGrid };
