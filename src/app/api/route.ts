import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { message: "default response from route GET" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "failed to load data from route GET" },
      { status: 500 },
    );
  }
}
