import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

 
  const isCartPage = pathname.match(/^\/(en|ar)\/cart/);

  if (isCartPage) {
    const token = request.cookies.get("token")?.value;
    if (!token) {

      const locale = pathname.split("/")[1] || "en";
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
