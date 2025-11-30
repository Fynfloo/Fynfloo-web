import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rootDomain } from './lib/utils';

const PROTECTED_PATHS = [
  '/dashboard',
  '/settings',
  '/account',
  '/editor',
  '/admin',
];

// -----------------------------------
// SILENT REFRESH FUNCTIONALITY
// -----------------------------------

async function attemptSilentRefresh(req: NextRequest) {
  const refresUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

  const backendRes = await fetch(refresUrl, {
    method: 'POST',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
      'User-Agent': req.headers.get('user-agent') ?? '',
    },
    credentials: 'include',
  });

  if (!backendRes.ok) return null;

  // Extract Set-Cookie headers from the backend response
  const cookies = backendRes.headers.getSetCookie();
  if (!cookies || cookies.length === 0) {
    return null;
  }

  // Continue reuest with updated cookies
  const next = NextResponse.next();
  for (const cookie of cookies) {
    next.headers.append('set-cookie', cookie);
  }
  return next;
}

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;
  const subdomain = extractSubdomain(req);

  //const TENANT_ONLY = ['/dashboard', '/settings', '/editor'];

  if (subdomain) {
    // Block access to admin page for subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    if (pathname == '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, req.url));
    }

    //Tenant dashboard on subdomain
    if (pathname == '/dashboard') {
      return NextResponse.rewrite(
        new URL(`/s/${subdomain}/dashboard`, req.url)
      );
    }

    // for (const p of TENANT_ONLY) {
    //   if (pathname.startsWith(p)) {
    //     return NextResponse.rewrite(
    //       new URL(`/s/${subdomain}${pathname}`, req.url)
    //     );
    //   }
    // }
  }

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/check-email') ||
    pathname.startsWith('/confirmed') ||
    pathname.startsWith('/confirm-email');

  if (token && isAuthPage) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Protected pages only
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    if (!token) {
      // Try to refresh from backend
      const refreshed = await attemptSilentRefresh(req);
      if (refreshed) {
        return refreshed;
      }

      // Not logged in - redirect to login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Match all paths except static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
