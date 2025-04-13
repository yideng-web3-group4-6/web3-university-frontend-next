import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANGUAGE_COOKIE_KEY, DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES, Language } from '@/i18n/config';

export function middleware(request: NextRequest) {
  // Get the language from the cookie, or default to Chinese
  const localeCookie = request.cookies.get(LANGUAGE_COOKIE_KEY)?.value;
  const locale = localeCookie && AVAILABLE_LANGUAGES.includes(localeCookie as Language)
    ? localeCookie
    : DEFAULT_LANGUAGE;

  // Clone the response
  const response = NextResponse.next();

  // If the cookie is missing, set it
  if (!request.cookies.has(LANGUAGE_COOKIE_KEY)) {
    response.cookies.set(LANGUAGE_COOKIE_KEY, DEFAULT_LANGUAGE, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
    });
  }

  return response;
}

// Match all requests
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 
