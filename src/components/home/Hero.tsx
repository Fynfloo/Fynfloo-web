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
    <section className="relative isolate overflow-hidden bg-white py-32">
      {/* === Layer 1: Soft Top + Bottom Gradient Blend === */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-transparent to-white"
      />

      {/* === Layer 2: Gradient Blobs (Top) === */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-56 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-72"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 72.5% 32.5%, 60.2% 62.4%, 47.5% 58.3%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg]
          bg-gradient-to-tr from-[oklch(0.7_0.164_282)] via-pink-300/70 to-[oklch(0.56_0.14_282)] opacity-40
          sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>

      {/* === Layer 3: Gradient Blobs (Bottom) === */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-28rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 72.5% 32.5%, 60.2% 62.4%, 47.5% 58.3%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2
          bg-gradient-to-tr from-pink-200/60 via-[oklch(0.7_0.164_282)/60] to-[oklch(0.56_0.14_282)/60] opacity-40
          sm:left-[calc(50%+36rem)] sm:w-[72rem]"
        />
      </div>

      {/* === Layer 4: Larger Grid Overlay === */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:200px_200px]"
      />

      {/* === Hero Content === */}
      <div className="container relative z-10 text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight lg:text-6xl text-gray-900">
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
