import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { comments } from "../data";
import { headers, cookies } from "next/headers";

// 캐싱막기
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //* query를 다루는 법*/
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  //* header를 다루는 법*/
  //const requestHeaders = new Headers(request.headers);  // 일반적인 HEADER  사용
  const headerList = headers(); // nextjs header

  //* cookies를 다루는 법*/
  const theme = request.cookies.get("theme");
  cookies().set("resultsPerPage", "20");
  const cookieData = cookies().get("resultsPerPage"); // {name:"resultsPerPage",value:"20", path:"/"}

  //console.log(requestHeaders.get("Authorization"))
  console.log(headerList.get("Authorization"));

  //* params를 다루는 법*/
  if (parseInt(params.id) > comments.length) {
    redirect("/api/apitest");
  }
  const comment = comments.find((item) => item.id === parseInt(params.id));
  //return Response.json(comment); // 해당방식은 next.js 내장 방식

  return new Response(JSON.stringify(comment), {
    headers: {
      "Content-Type": "application/json", // "text/html"
      "Set-Cookie": "theme=dark", // 쿠키 입력하기
    },
  });
}

// 보통 POST로 다 처리하지 PATCH로 넘어가진 않음
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { text } = body;
  const index = comments.findIndex(
    (comment) => comment.id === parseInt(params.id)
  );
  comments[index].text = text;
  return new Response(JSON.stringify(comments[index]), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = comments.findIndex(
    (comment) => (comment.id = parseInt(params.id))
  );
  const deletedComment = comments[index];
  comments.splice(index, 1);

  return new Response(JSON.stringify(deletedComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
