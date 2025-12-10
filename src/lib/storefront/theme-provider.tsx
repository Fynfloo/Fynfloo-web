'use client';

import type { ThemeSettings } from './types';
import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext<ThemeSettings | null>(null);

export function ThemeProvider({
  theme,
  children,
}: {
  theme: ThemeSettings;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-bg', theme.backgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--radius-base', theme.radius);
    root.dataset.font = theme.fontFamily;
  }, [theme]);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}
