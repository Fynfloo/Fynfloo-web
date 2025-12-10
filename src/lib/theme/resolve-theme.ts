import { defaultTheme } from './tokens';
import type { ThemeSettings } from '../storefront/types';

export function resolveTheme(settings?: Partial<ThemeSettings>): ThemeSettings {
  return {
    ...defaultTheme,
    ...(settings || {}),
  };
}
