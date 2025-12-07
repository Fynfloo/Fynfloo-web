import { NextRequest, NextResponse } from 'next/server';
import { apiUrl } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  // Forward 'Set-Cookie' headers from backend response to client
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }
  return response;
}
