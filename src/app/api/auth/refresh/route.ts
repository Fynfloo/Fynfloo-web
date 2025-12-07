import { NextRequest, NextResponse } from 'next/server';
import { apiUrl } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
    },
    credentials: 'include',
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }
  return response;
}
