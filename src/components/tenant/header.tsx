'use client';

import { UserMenu } from '../dashboard/user-menu';
import { ModeToggle } from '../ui/mode-toggle';
import Link from 'next/link';

const logo = {
  url: '/',
  src: '/fynfloo.svg',
  alt: 'logo',
  title: 'Fynfloo',
};

export function TenantHeader({ tenantSlug }: { tenantSlug: string }) {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* Company Logo */}
        <Link
          href={`/s/${tenantSlug}/dashboard`}
          className="text-xl font-bold text-primary tracking-tight"
        >
          <img src={logo.src} className="h-8 w-8 dark:invert" alt={logo.alt} />
        </Link>

        {/* Store name */}
        <span className="text-muted-foreground border-l pl-3">
          <strong className="text-foreground">{tenantSlug}</strong> store
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
