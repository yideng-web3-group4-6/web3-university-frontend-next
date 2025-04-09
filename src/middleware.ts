// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from './i18n/config';

acceptLanguage.languages([...languages]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};

export function middleware(req: NextRequest) {
  // Skip middleware processing for non-HTML requests
  if (!req.headers.get('accept')?.includes('text/html')) {
    return NextResponse.next();
  }

  let lng: string | null = null;

  // Check cookie
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  // Check Accept-Language header
  if (!lng) {
    const acceptLangHeader = req.headers.get('Accept-Language');
    lng = acceptLanguage.get(acceptLangHeader);
  }

  // Use fallback language
  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if language in path is missing or unsupported
  const pathname = req.nextUrl.pathname;
  
  const pathnameIsMissingLocale = languages.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  );

  if (pathnameIsMissingLocale) {
    // Correctly handle root path and other paths
    const targetPath = pathname === '/' ? `/${lng}` : `/${lng}${pathname}`;
    const redirectUrl = new URL(targetPath, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Set language cookie if needed
  if (req.cookies.get(cookieName)?.value !== lng) {
    const response = NextResponse.next();
    response.cookies.set(cookieName, lng, { path: '/', maxAge: 365 * 24 * 60 * 60 });
    return response;
  }

  return NextResponse.next();
}