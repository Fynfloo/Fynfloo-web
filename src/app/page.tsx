'use client';

import { useAuth } from '../context/AuthContext';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/Hero';

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <main style={{ margin: '0rem auto' }}>
      <Navbar />
      <Hero />
    </main>
  );
}
