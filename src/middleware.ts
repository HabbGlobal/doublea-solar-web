import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * 1. Öffentliche Seiten: Sprach-Routing (Deutsch ohne Präfix, Englisch
 *    unter /en/… mit englischen Pfaden).
 * 2. /admin/*: wer nicht eingeloggt ist, wird auf /admin/login umgeleitet.
 *    Die Login-Seite selbst bleibt offen; Admin bleibt einsprachig.
 */
/**
 * Liefert für /en/<deutscher-slug> den englischen Pfad, sonst null.
 * Verhindert doppelte Inhalte wie /en/pakete neben /en/packages.
 */
function canonicalEnglishPath(pathname: string): string | null {
  if (!pathname.startsWith("/en/")) return null;
  const rest = pathname.slice(3); // "/pakete"
  const entry = (routing.pathnames as Record<string, string | { de: string; en: string }>)[rest];
  if (!entry || typeof entry === "string") return null;
  return entry.de === rest && entry.en !== rest ? `/en${entry.en}` : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    // Deutscher Slug unter /en/ (z.B. /en/pakete) → kanonischer englischer Pfad
    const canonical = canonicalEnglishPath(pathname);
    if (canonical) {
      const url = request.nextUrl.clone();
      url.pathname = canonical;
      return NextResponse.redirect(url, 308);
    }
    return intlMiddleware(request);
  }
  // Login-Seite immer durchlassen
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    // Ohne Supabase-Setup einfach durchlassen (Dev-Fallback).
    return response;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Alles ausser API, Next-Interna, Metadaten-Routen und Dateien mit Endung
  matcher: ["/((?!api|_next|_vercel|icon$|apple-icon$|opengraph-image$|.*\\..*).*)"],
};
