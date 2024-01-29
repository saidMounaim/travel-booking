import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const file: any = req.body || "";

  const contentType = req.headers.get("content-type") || "text/plain";

  const filename = `${nanoid(10)}${contentType.split("/")[1]}`;

  const blob = await put(filename, file, {
    contentType,
    access: "public",
    addRandomSuffix: false,
  });

  return NextResponse.json(blob);
}
