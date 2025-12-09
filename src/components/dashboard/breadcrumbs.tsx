'use client';

import Link from 'next/link';

export default function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href: string }[];
}) {
  return (
    <nav className="text-sm flex items-center text-muted-foreground">
      {trail.map((item, idx) => (
        <span key={idx} className="flex items-center">
          <Link href={item.href} className="hover:text-primary">
            {item.label}
          </Link>
          {idx < trail.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
