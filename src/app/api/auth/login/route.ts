import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserModel } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = connectToFirebase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, role } = body;

    const userDocRef = doc(db, "users", username);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return new NextResponse(
        JSON.stringify({ error: "User does not exists", success: false }),
        { status: 400 }
      );
    }

    // validate password
    const validPassword = await bcrypt.compare(
      password,
      userDoc.data().password
    );
    const validRole = userDoc.data().role === role;
    if (!validPassword || !validRole) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid credentials", success: false }),
        { status: 400 }
      );
    }

    // create token
    const tokenData = {
      username: userDoc.data().username,
      role: userDoc.data().role,
    };

    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRETE!, {
      expiresIn: "1d",
    });

    const reponse = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    reponse.cookies.set("token", token, {
      httpOnly: true,
    });

    return reponse;
  } catch (error) {
    console.log("Login post error: ",error);

    return new NextResponse(
      JSON.stringify({ error: (error as Error).message, success: false }),
      { status: 400 }
    );
  }
}
