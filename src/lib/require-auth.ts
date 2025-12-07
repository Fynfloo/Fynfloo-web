import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { apiUrl } from './utils';

export async function requireAuth() {
  const res = await fetch(`api/auth/me`, {
    credentials: 'include',
  });
  if (res.status === 401) {
    redirect('/login');
  }

  if (!res.ok) {
    console.error('Unexpected ME response:', res.status);
    redirect('/login');
  }
  const user = await res.json();
  return user;
}
