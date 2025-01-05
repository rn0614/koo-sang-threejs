import { handleError } from "@/utils/errorHandler";
import { HfInference, TranslationOutputValue } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const inference = new HfInference(process.env.HF_ACCESS_TOKEN);
/** 
 * @swagger 
 * /api/huggingface:
 *   post:
 *     tags:
 *       - huggingface
 *     description: huggingface API
 *     responses:  
 *       200:
 *         description: TranslationOutputValue[]  
 *       500:
 *         description: Error 
 */ 
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text, lang } = body as {
    text: string;
    lang: "en-es" | "en-de" | "en-fr";
  };

  const languageModels = {
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "en-de": "Helsinki-NLP/opus-mt-en-de",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
  };
  try {
    const translationResponse = (await inference.translation({
      model: languageModels[lang],
      inputs: text,
    })) as TranslationOutputValue[];
    return NextResponse.json(translationResponse);
  } catch (error) {
    return handleError("Error fetching data from huggingface", 500);
  }

  
}
