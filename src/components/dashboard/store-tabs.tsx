'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Overview', path: undefined },
  { name: 'Products', path: 'products' },
  { name: 'Orders', path: 'orders' },
  { name: 'Pages', path: 'pages' },
  { name: 'Theme', path: 'theme' },
  { name: 'Analytics', path: 'analytics' },
  { name: 'Settings', path: 'settings' },
];

export default function StoreTabs({ storeId }: { storeId: string }) {
  const pathname = usePathname();

  return (
    <div className="flex space-x-6 border-b">
      {tabs.map((tab) => {
        const href =
          tab.path === undefined
            ? `/dashboard/stores/${storeId}`
            : `/dashboard/stores/${storeId}/${tab.path}`;

        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'pb-2 border-b-2',
              active
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
