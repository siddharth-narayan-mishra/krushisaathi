import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserModel } from "@/models/User";
import { LabModel } from "@/models/Labs";
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
      country,
      state,
      district,
      fulladdress,
      passbook,
      photo,
      ekyf,
      latitude,
      longitude,
      labName
    } = body;

    // if (
    //   !name ||
    //   !username ||
    //   !password ||
    //   !role ||
    //   !adhaar ||
    //   !country ||
    //   !state ||
    //   !district ||
    //   !fulladdress ||
    //   !passbook ||
    //   !photo ||
    //   !ekyf
    // ) {
    //   return NextResponse.json(
    //     { error: "Missing required fields", success: false },
    //     { status: 400 }
    //   );
    // }

    const collection = role === "soil-agent" ? "labs" : "users";
    const userDocRef = doc(db, collection, username);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user =
      role === "soil-agent"
        ? new LabModel({
            name,
            username,
            password: hashedPassword,
            role,
            labName,
            address: { country, state, district, fulladdress },
            position:
              latitude && longitude ? { latitude, longitude } : undefined
          })
        : new UserModel({
            name,
            username,
            password: hashedPassword,
            role,
            adhaar,
            passbook,
            photo,
            ekyf
          });
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Something went wrong",
        success: false
      },
      { status: 500 }
    );
  }
}
