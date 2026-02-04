import React from 'react';

type FieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
};

export function Field({ label, htmlFor, children, hint }: FieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-medium text-gray-700"
      >
        {label}
        {children}
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </label>
    </div>
  );
}
