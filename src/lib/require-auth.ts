import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { apiUrl } from './utils';

export async function requireAuth() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${apiUrl}/auth/me`, {
    method: 'GET',
    headers: { cookie: cookieHeader },
    credentials: 'include',
    cache: 'no-store',
  });

  if (res.status === 401) {
    redirect('/login');
  }

  if (!res.ok) {
    console.error('Unexpected ME response:', res.status);
    redirect('/login');
  }

  const data = await res.json();
  return data; // user object
}
