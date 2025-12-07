import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'app.lvh.me';
export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || 'http://api.lvh.me:8080';
