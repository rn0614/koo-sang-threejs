import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(req: NextRequest, res: NextResponse) {
  //const response = NextResponse.next();  // res와 동일
  const themePreference = req.cookies.get("theme");
  if (!themePreference) {
    res.cookies.set("theme", "dark"); // header부분에 Set-Cookie부분이 이 부분으로 처리됨
  }

  //*사용자 정의 custom header 정의*/
  res.headers.set("custom-header", "custom-value");

  
  return await updateSession(req);
}

export const config = {
  matcher: ["/private/:path*", "/user/:path*"], // 인증이 필요한 경로 설정
};
