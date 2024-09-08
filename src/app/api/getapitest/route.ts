import { handleError } from "@/utils/errorHandler";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

    if(error){
      return handleError('Error fetching data from Supabase', 500);
    }

    return new Response(JSON.stringify(data),{
      status:200,
      headers:{'Content-Type':'application/json'}
    })

  } catch (error) {
    return handleError('Error fetching data from Supabase', 500);
  }
}