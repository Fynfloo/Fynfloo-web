import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const Hero = ({
  heading = 'Launch Your Online Store in Minutes with AI',
  description = 'Create a stunning e-commerce website, manage products, and start accepting payments, all powered by AI. No coding, no stress, just your business, live in minutes.',
  button = {
    text: 'Start for Free',
    url: '/signup',
  },
}) => {
  return (
    <section className="py-32">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <Link href={button.url}>{button.text}</Link>
        </Button>
      </div>
    </section>
  );
};

export { Hero };
