import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

function getLocale({ headers }) {
  return new Negotiator({ headers }).language(locales as any);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = { matcher: ["/((?!_next).*)"] };
