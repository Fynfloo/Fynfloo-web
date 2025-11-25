import { Navbar } from '@/components/home/navbar';
import { Hero } from '@/components/home/Hero';
import { BentoGrid } from '@/components/home/bento-grid';
import { Features } from '@/components/home/features';
import { Pricing } from '@/components/home/pricing';
import { CallToAction } from '@/components/home/call-to-action';
import { Footer } from '@/components/home/footer';

export default function Home() {
  return (
    <main style={{ margin: '0rem auto' }}>
      <Navbar />
      <Hero />
      <BentoGrid />
      <Features />
      <Pricing />
      <CallToAction />
      <Footer />
    </main>
  );
}
