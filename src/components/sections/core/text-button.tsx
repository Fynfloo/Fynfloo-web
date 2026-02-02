import React from 'react';
import clsx from 'clsx';

type TextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function TextButton({ className, ...props }: TextButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'text-sm underline opacity-80 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 rounded-sm',
        className,
      )}
    />
  );
}
