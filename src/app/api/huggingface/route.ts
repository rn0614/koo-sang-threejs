import { HfInference, TranslationOutputValue } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

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

  const translationResponse = (await inference.translation({
    model: languageModels[lang],
    inputs: text,
  })) as TranslationOutputValue[];

  return NextResponse.json(translationResponse);
}
