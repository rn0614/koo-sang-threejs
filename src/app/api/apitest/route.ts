import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {
  //* query를 다루는 법*/
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;

  return new Response(JSON.stringify(filteredComments), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export async function POST(request: Request, response: Response) {
  const reqComment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: reqComment.text,
  }; // 여기서 newComment 는 json 객체가 아님
  comments.push(newComment);

  //return Response.json(newComment);  // NextResponse.json 객체임

  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
