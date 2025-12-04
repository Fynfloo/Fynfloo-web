'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = { label: string; href: string };

export function MainNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex ml-6 gap-4 text-sm">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-3 py-1.5 rounded-full transition-colors',
              active
                ? 'bg-slate-800 text-slate-50'
                : 'text-slate-400 hover:text-slate-50 hover:bg-slate-900'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
