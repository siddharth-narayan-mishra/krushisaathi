import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig"
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = connectToFirebase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, role } = body;

    const userCollection = collection(
      db,
      role === "soil-agent" ? "labs" : "users"
    );
    const userQuery = query(userCollection, where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);
    const userDoc = querySnapshot.docs[0];

    if (!userDoc) {
      return new NextResponse(
        JSON.stringify({ error: "User does not exists", success: false }),
        { status: 400 }
      );
    }

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

    const tokenData = {
      id: userDoc.data().id,
      role: userDoc.data().role
    };

    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRETE!, {
      expiresIn: "1d"
    });

    const reponse = NextResponse.json({
      message: "Login successful",
      success: true
    });

    reponse.cookies.set("token", token, {
      httpOnly: true
    });

    reponse.cookies.set("role", role, {
      httpOnly: true
    });

    return reponse;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message, success: false }),
      { status: 400 }
    );
  }
}
