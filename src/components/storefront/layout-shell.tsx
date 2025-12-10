'use client';

import type { Store } from '../../lib/storefront/types';
import Link from 'next/link';

export function LayoutShell({
  store,
  children,
}: {
  store: Store;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            {store.name}
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/products">Shop</Link>
            {store.businessType === 'food' && <Link href="/menu">Menu</Link>}
            {store.businessType === 'events' && (
              <Link href="/events">Services</Link>
            )}
            <Link href="/cart">Cart</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t border-black/5 mt-10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {store.name}. Powered by Fynfloo.
        </div>
      </footer>
    </div>
  );
}
