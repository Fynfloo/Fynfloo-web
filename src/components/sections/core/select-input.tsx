import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput(props: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="
          w-full
          appearance-none
          rounded-sm
          border border-black/10
          bg-white
          px-3 py-2 pr-8
          text-sm
          text-gray-900
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--color-primary)]/30
          focus:border-[var(--color-primary)]
        "
      />
      {/* Chevron */}
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
        aria-hidden
      >
        ▼
      </span>
    </div>
  );
}
