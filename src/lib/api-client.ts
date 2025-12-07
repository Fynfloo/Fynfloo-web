import { cookies } from 'next/headers';
import { apiUrl } from './utils';

export async function apiFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      cookie: cookieHeader,
    },
    credentials: 'include',
    cache: 'no-store',
  });
}
