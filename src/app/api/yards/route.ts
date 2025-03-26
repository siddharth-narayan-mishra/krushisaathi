import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("farmer");
    const labId = searchParams.get("soil-agent");

    if (!userId && !labId) {
      return new NextResponse(
        JSON.stringify({
          message: "user or lab ID is required",
          success: false,
        }),
        { status: 400 }
      );
    }

    const yardsCollection = collection(db, "yards");
    const q = userId
      ? query(yardsCollection, where("userId", "==", userId))
      : query(yardsCollection, where("labId", "==", labId));

    const yardsSnapshot = await getDocs(q);

    if (yardsSnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ message: "No yards found", success: false }),
        { status: 404 }
      );
    }

    const yardsList = yardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new NextResponse(
      JSON.stringify({ yards: yardsList, success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message, success: false }),
      {
        status: 500,
      }
    );
  }
}
