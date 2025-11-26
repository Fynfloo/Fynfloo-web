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
  heading = 'Launch Your Online Store in Minutes',
  description = 'Create a stunning e-commerce website, manage products, and start accepting payments, all in one simple platform. No coding, no hassle, just your business live in minutes.',
  button = {
    text: 'Start for Free',
    url: '/signup',
  },
}: HeroProps) => {
  return (
    <section className="flex justify-center relative isolate overflow-hidden bg-background py-32">
      {/* === Hero Content === */}
      <div className="container relative z-10 text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight lg:text-6xl text-foreground">
            {heading}
          </h1>
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
