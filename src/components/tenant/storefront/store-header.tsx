// components/storefront/store-header.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { StorefrontTenant } from '@/lib/storefront/mock-data';
import { MainNav } from './main-nav';
import { MiniCart } from './mini-cart';
import { cn } from '@/lib/utils';

type Props = { tenant: StorefrontTenant };

export function StoreHeader({ tenant }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniCartOpen, setMiniCartOpen] = React.useState(false);

  const baseHref = `/s/${tenant.slug}`;
  const navItems = [
    { label: 'Home', href: baseHref },
    { label: 'Shop', href: `${baseHref}/products` },
    { label: 'Search', href: `${baseHref}/search` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <button
          className="flex lg:hidden p-2 rounded-xl border border-slate-800"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href={baseHref} className="flex items-center gap-2">
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: tenant.accentColor }}
          >
            {tenant.logoText}
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">
            {tenant.tagline}
          </span>
        </Link>

        <MainNav items={navItems} />

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`${baseHref}/search`}
            className="hidden sm:flex items-center gap-2 text-sm text-slate-400 border border-slate-800 rounded-full px-3 py-1.5 hover:border-slate-600"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Link>

          <Link
            href={`${baseHref}/account/login`}
            className="p-2 rounded-xl border border-slate-800 hover:border-slate-600"
          >
            <User className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setMiniCartOpen(true)}
            className="flex items-center gap-1 rounded-full bg-slate-50 text-slate-950 px-3 py-1.5 text-sm font-medium hover:bg-slate-200"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950">
          <nav className="px-4 py-3 flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-3 py-2 rounded-xl text-slate-400 hover:text-slate-50 hover:bg-slate-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <MiniCart open={miniCartOpen} onOpenChange={setMiniCartOpen} />
    </header>
  );
}
