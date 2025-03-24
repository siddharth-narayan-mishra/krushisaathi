import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const yardId = req.nextUrl.pathname.split("/").pop();
    if (!yardId) {
      return new NextResponse(
        JSON.stringify({ message: "YardId is required", success: false }),
        {
          status: 400
        }
      );
    }

    const yardsRef = collection(db, "yards");
    const q = query(yardsRef, where("yardId", "==", yardId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ message: "Yard not found", success: false }),
        {
          status: 404
        }
      );
    }

    const yardData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];

    return new NextResponse(
      JSON.stringify({ yard: yardData, success: true }),
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