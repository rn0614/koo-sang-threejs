// pages/api/getImage.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req:any, res:any) {
  const { imagePath } = req.query;

  if (!imagePath) {
    return res.status(400).json({ error: 'Missing imagePath' });
  }

  const { data, error }:any = supabase.storage.from('images').getPublicUrl(imagePath);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ publicUrl: data.publicUrl });
}
