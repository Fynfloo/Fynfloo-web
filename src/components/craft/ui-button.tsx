// ui-button.tsx — non-craft version for Toolbox
import React from 'react';

export const UIButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    style={{
      borderRadius: 6,
      padding: '8px 12px',
      cursor: 'grab',
      background: '#f4f4f4',
      border: '1px solid #ddd',
    }}
  >
    {children}
  </button>
));
UIButton.displayName = 'UIButton';
