import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const role = req.cookies.get("role")?.value || "";

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "User not authenticated", success: false }),
        { status: 401 }
      );
    }
    const decodedToken = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_TOKEN_SECRETE!
    );

    if (typeof decodedToken !== "string" && "id" in decodedToken) {
      const docRef = doc(
        db,
        role === "soil-agent" ? "labs" : "users",
        decodedToken.id
      );
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const user = { ...userDoc.data() };
        delete user.password;
        delete user.verifyToken;
        delete user.verifyTokenExpiry;
        delete user.forgotPasswordTokenExpiry;
        delete user.forgotPasswordToken;
        return new NextResponse(
          JSON.stringify({
            message: "User authenticated",
            success: true,
            user: user
          }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "User not authenticated", success: false }),
          { status: 401 }
        );
      }
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
