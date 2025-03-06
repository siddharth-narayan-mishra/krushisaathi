import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "User not authenticated", success: false }),
        { status: 401 }
      );
    } else {
        
      const decodedToken = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_TOKEN_SECRETE!
      );
      if (typeof decodedToken !== "string" && "username" in decodedToken) {
        return new NextResponse(
          JSON.stringify({ message: "User authenticated", success: true }),
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
