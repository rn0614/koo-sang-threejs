import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  //const response = NextResponse.next();  // res와 동일
  const themePreference = req.cookies.get("theme");
  if (!themePreference) {
    res.cookies.set("theme", "dark"); // header부분에 Set-Cookie부분이 이 부분으로 처리됨
  }

  //*사용자 정의 custom header 정의*/
  res.headers.set("custom-header", "custom-value");


  // supabase 작동설정
  const supabase = createMiddlewareClient({ req, res });
  console.log("middleware");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("./private")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("./user")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
      //return NextResponse.rewrite(new URL("/login", req.url)); // 주소는 그대로 유지함
    }
  }

  return res;
}

export const config = {
  matcher: ["/private/:path*", "/user/:path*"], // 인증이 필요한 경로 설정
};
