import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value || "";

  if (!token && path !== "/login" && path !== "/signup") {
    return NextResponse.redirect(new URL("/landing", req.nextUrl));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_TOKEN_SECRETE
      );
      const { payload } = await jwtVerify(token, secret);
      const { role } = payload as { role: string };
      console.log("payload", payload);

      if (path === "/login" || path === "/signup") {
        if (role === "soil-agent") {
          return NextResponse.redirect(new URL("/soil-agent", req.nextUrl));
        } else {
          return NextResponse.redirect(new URL("/", req.nextUrl));
        }
      }

      if (role === "soil-agent" && path !== "/soil-agent") {
        return NextResponse.redirect(new URL("/soil-agent", req.nextUrl));
      }

      if (role !== "soil-agent" && path === "/soil-agent") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }

      if (path === "/login" || path === "/signup") {
        if (role === "soil-agent") {
          return NextResponse.redirect(new URL("/soil-agent", req.nextUrl));
        } else {
          return NextResponse.redirect(new URL("/", req.nextUrl));
        }
      }

      if (role !== "soil-agent" && path === "/soil-agent") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/soil-agent/:path*",
    "/register-soil-sample/:path*",
  ],
};
