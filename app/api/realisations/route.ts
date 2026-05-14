import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "realisations");
    const files = await readdir(dir);
    const photos = files
      .filter((f) => /\.(jpg|jpeg|webp|png)$/i.test(f))
      .sort()
      .map((f) => `/realisations/${f}`);
    return NextResponse.json(photos);
  } catch {
    return NextResponse.json([]);
  }
}
