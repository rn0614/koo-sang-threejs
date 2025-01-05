import { NextRequest, NextResponse } from "next/server";
import schema from "@/types/types-schema.json";

export async function GET() {
  if (
    process.env.NEXT_PUBLIC_API_GP === "local" ||
    process.env.NEXT_PUBLIC_API_GP === "dev"
  ) {
    return NextResponse.json(schema);
  }
  return NextResponse.json(null);
}