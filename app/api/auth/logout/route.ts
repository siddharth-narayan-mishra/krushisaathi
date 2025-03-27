import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
