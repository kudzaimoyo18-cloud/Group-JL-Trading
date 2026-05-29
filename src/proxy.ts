import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Next.js 16 renamed Middleware to Proxy. Runs before a request completes.
// Here it ensures every page request carries a locale prefix (/fr or /en),
// defaulting to French as requested.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API, and any file with an extension (assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
