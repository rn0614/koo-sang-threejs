import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
//import { updateSession } from '@/utils/supabase/middleware'

const COOKIE_COUNTER = "cookie-counter";


export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  const res = NextResponse.next() // response는 따로 구현

  if(req.cookies.get(COOKIE_COUNTER)?.value){
    const preCookieCounter = req.cookies.get(COOKIE_COUNTER)?.value;
    res.cookies.set(COOKIE_COUNTER, `${Number(preCookieCounter)+1}`)
  }else{
    res.cookies.set(COOKIE_COUNTER,"1");
  }

  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/api/:path*"
  ],
};
