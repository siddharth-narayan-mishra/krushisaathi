import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Get the id from the URL
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "ID is required", success: false }),
        {
          status: 400,
        }
      );
    }

    const docRef = doc(db, "labs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Lab not found", success: false }),
        {
          status: 404,
        }
      );
    }

    const lab = { id: docSnap.id, ...docSnap.data() };

    return new NextResponse(JSON.stringify({ lab, success: true }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: errorMessage, success: false }),
      {
        status: 500,
      }
    );
  }
}
