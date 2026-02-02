import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-sm border border-black/10 px-3 py-2 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
    />
  );
}
