import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
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

    if (typeof decodedToken !== "string" && "username" in decodedToken) {
      const docRef = doc(db, "users", decodedToken.username);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        const user = { ...userDoc.data() };
        delete user.password;
        delete user.verifyToken;
        delete user.verifyTokenExpiry  ;
        delete user.forgotPasswordTokenExpiry;
        delete user.forgotPasswordToken;

        return new NextResponse(
          JSON.stringify({
            message: "User authenticated",
            success: true,
            user: user,
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
