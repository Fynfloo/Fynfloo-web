'use client';

import clsx from 'clsx';

export function SectionShell({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'muted';
}) {
  return (
    <section
      className={clsx(
        'py-10 md:py-14',
        variant === 'hero' && 'pt-12 md:pt-16',
        variant === 'muted' && 'bg-black/[0.02] rounded-3xl px-6 md:px-10',
        className
      )}
    >
      {children}
    </section>
  );
}
