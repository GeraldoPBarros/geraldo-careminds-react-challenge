import { NextResponse } from "next/server";

export async function GET() {
  try {
    const portfolio = await fetch(
      "https://v0nr8pvsvgywhlm4.public.blob.vercel-storage.com/careminds/portfolio-j6Xaknu4XzSzazvXTjaNiYgFDx8yv8.json"
    );

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
