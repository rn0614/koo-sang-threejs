import { handleError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/songs/{songId}:
 *   get:
 *     tags:
 *       - songs
 *     description: songDetail
 *     parameters:
 *      - name: songId
 *        in: params
 *     responses:
 *       200:
 *         description: song
 *       404:
 *         description: no data
 *       500:
 *         description: Error
 */
export async function GET(
  request: Request,
  { params }: { params: { songId: string } }
) {
  const supabase = createClient();
  if (!params.songId) {
    console.log("songId", params.songId);
    return NextResponse.json({ error: "없는 노래입니다." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", `${params.songId}`)
    .single();
  if (error) {
    console.log(error);
  }
  if (data == null) {
    return handleError("There is no data", 404);
  }
  return NextResponse.json(data);
}
