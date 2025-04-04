import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserModel } from "@/models/User";
import { LabModel } from "@/models/Labs";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";

const db = connectToFirebase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      pincode,
      streetAddress,
      city,
      username,
      password,
      role,
      adhaar,
      country,
      state,
      district,
      passbook,
      photo,
      ekyf,
      latitude,
      longitude,
      labName,
      phone
    } = body;

    const id = v4();

    const collection = role === "soil-agent" ? "labs" : "users";
    const userDocRef = doc(db, collection, id);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const fullAddress = `${streetAddress}, ${city}, ${district}, ${pincode}, ${state}, ${country}`;

    const user =
      role === "soil-agent"
        ? new LabModel({
            id,
            username,
            password: hashedPassword,
            role,
            labName,
            address: {
              country,
              state,
              district,
              fulladdress: fullAddress,
              pincode,
              city,
              streetaddress: streetAddress
            },
            position:
              latitude && longitude ? { latitude, longitude } : undefined,
            phone: phone
          })
        : new UserModel({
            id,
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
