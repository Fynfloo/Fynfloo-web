import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && [
          'rounded-full',
          'bg-[var(--color-primary)]',
          'text-white',
          'px-4 py-2',
        ],
        variant === 'secondary' && [
          'rounded-full',
          'border border-black/15',
          'bg-white',
          'text-gray-900',
          'px-4 py-2',
          'shadow-sm', // ← subtle lift
          'transition-all',

          // Hover
          'hover:bg-gray-50',
          'hover:border-black/30',
          'hover:shadow',

          // Active (pressed)
          'active:shadow-none',
          'active:translate-y-[0.5px]',

          // Focus
          'focus:ring-2',
          'focus:ring-[var(--color-primary)]/30',
        ],
        fullWidth && 'w-full',
        className,
      )}
    />
  );
}
