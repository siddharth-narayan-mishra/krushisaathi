import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserModel } from "@/models/User";
import bcrypt from "bcrypt";

const db = connectToFirebase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      username,
      password,
      role,
      adhaar,
      address,
      passbook,
      photo,
      ekyf,
    } = body;

    console.log(
      name,
      username,
      password,
      role,
      adhaar,
      address,
      passbook,
      photo,
      ekyf
    );

    if (
      name === undefined ||
      username === undefined ||
      password === undefined ||
      role === undefined ||
      adhaar === undefined ||
      address === undefined ||
      passbook === undefined ||
      photo === undefined ||
      ekyf === undefined
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields", success: false }),
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "users", username);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return new NextResponse(
        JSON.stringify({ error: "User already exists", success: false }),
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      ...body,
      password: hashedPassword,
    });

    await setDoc(doc(db, "users", user.username), { ...user });

    return new NextResponse(
      JSON.stringify({ message: "User created successfully", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message, success: false }),
      {
        status: 400,
      }
    );
  }
}
