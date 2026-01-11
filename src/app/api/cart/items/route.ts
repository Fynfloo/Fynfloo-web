// app/api/cart/items/route.ts
import { fetchStoreBySlug } from '@/lib/storefront/fetch-storefront-data';
import { apiUrl } from '@/lib/utils';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const body = await req.json();

  const host = headerStore.get('host');
  const storeSlug = host?.split('.')[0]; // Assuming store slug is the subdomain

  if (!storeSlug) {
    return NextResponse.json(
      { error: 'Store slug not found in host' },
      { status: 400 }
    );
  }

  const store = await fetchStoreBySlug(storeSlug);
  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const backendRes = await fetch(
    `${apiUrl}/api/storefront/stores/${store.id}/cart/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }
  return response;
}
