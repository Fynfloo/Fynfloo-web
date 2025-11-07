'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/Hero';
import { BentoGrid } from '@/components/bento-grid';
import { Features } from '@/components/features';
import { Pricing } from '@/components/pricing';
import { CallToAction } from '@/components/call-to-action';
import { Footer } from '@/components/footer';

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
