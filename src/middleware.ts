console.log('--- Loading middleware.ts file ---'); // Add log at the top level

import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './i18n/config'

acceptLanguage.languages([...languages]) // Use spread operator here

export const config = {
  // Matcher updated to exclude public folder and static assets
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|static/).*)']
}

export function middleware(req: NextRequest) {
  console.log('Middleware function running for path:', req.nextUrl.pathname); // Keep existing logs
  let lng: string | null = null;

  // 1. Check cookie
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
    console.log('Language from cookie:', lng); // Add log
  }

  // 2. Check Accept-Language header
  if (!lng) {
    const acceptLangHeader = req.headers.get('Accept-Language');
    lng = acceptLanguage.get(acceptLangHeader);
    console.log('Language from header:', acceptLangHeader, '->', lng); // Add log
  }

  // 3. Use fallback language
  if (!lng) {
    lng = fallbackLng
    console.log('Using fallback language:', lng); // Add log
  }

  // Redirect if language in path is missing or unsupported
  const pathname = req.nextUrl.pathname
  // With matcher=['/'], pathname will always be '/'. 
  // So pathnameIsMissingLocale should always be true here.
  const pathnameIsMissingLocale = languages.every(
    (loc) => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  )
  console.log('Pathname:', pathname, 'Is missing locale?', pathnameIsMissingLocale); // Add log

  if (pathnameIsMissingLocale) {
    // Correctly handle root path and other paths
    const targetPath = pathname === '/' ? `/${lng}` : `/${lng}${pathname}`;
    const redirectUrl = new URL(targetPath, req.url);
    console.log('Redirecting to:', redirectUrl.toString()); // Add log
    return NextResponse.redirect(redirectUrl)
  }

  // This part should not be reached if matcher is just ['/']
  console.log('Middleware decided not to redirect.'); 
  // Set language cookie if detected language is different from cookie
  if (
    req.cookies.get(cookieName)?.value !== lng &&
    !req.headers.get('user-agent')?.includes('crawler') // Avoid setting cookie for crawlers if needed
  ) {
    console.log('Setting language cookie:', lng);
    const response = NextResponse.next()
    response.cookies.set(cookieName, lng, { path: '/', maxAge: 365 * 24 * 60 * 60 })
    return response
  }

  return NextResponse.next()
} 