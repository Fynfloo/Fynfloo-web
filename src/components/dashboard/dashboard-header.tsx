'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';
import { UserMenu } from './user-menu';
import { useSidebar } from '../ui/sidebar';

const logo = {
  url: '/',
  src: '/fynfloo.svg',
  alt: 'logo',
  title: 'Fynfloo',
};

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8 sticky top-0 z-50 w-full">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/dashboard" className="flex items-center gap-2">
          {/* replace with your actual logo */}
          <img src={logo.src} className="h-8 w-8 dark:invert" alt={logo.alt} />
          <div className="hidden flex-col leading-none md:flex">
            <span className="font-semibold text-primary">Fynfloo</span>
            <span className="text-xs text-muted-foreground">
              Store dashboard
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
