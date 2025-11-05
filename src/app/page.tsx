'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <main style={{ margin: '0rem auto' }}>
      <Navbar />
      <Hero />
    </main>
  );
}
