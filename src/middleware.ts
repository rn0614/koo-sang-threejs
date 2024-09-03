import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
//import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();  // res와 동일
  
  // if (!themePreference) {
  //   res.cookies.set("theme", "dark"); // header부분에 Set-Cookie부분이 이 부분으로 처리됨
  // }
  
  const supabase = createMiddlewareClient({req,res});

  const {
    data:{
      session
    }
  } = await supabase.auth.getSession();

  console.log(session)  
  const themePreference = req.cookies.get("theme");
  //return await updateSession(req);
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}