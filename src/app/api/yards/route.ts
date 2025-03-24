import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
// import { Lab } from "@/models/Labs";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const yardsCollection = collection(db, "yards");
    const yardsSnapshot = await getDocs(yardsCollection);
    const yardsList = yardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return new NextResponse(
      JSON.stringify({ yards: yardsList, success: true }),
      {
        status: 200
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error, success: false }), {
      status: 500
    });
  }
}
