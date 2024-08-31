import { handleError } from "@/utils/errorHandler";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
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