import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const db = connectToFirebase();

// get lab data
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

// sample registeration
export async function POST(req: NextRequest) {
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

    const labRef = doc(db, "labs", id);
    const labSnap = await getDoc(labRef);

    if (!labSnap.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Lab not found", success: false }),
        {
          status: 404,
        }
      );
    }

    const body = await req.json();
    const { username, farmName, samples } = body.values;

    if (!username || !farmName || !samples) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data", success: false }),
        {
          status: 400,
        }
      );
    }

    await updateDoc(labRef, {
      users: arrayUnion({ userId: username, status: { pending: "pending" } }),
    });

    

    return new NextResponse(
      JSON.stringify({
        message: "Sample registered successfully",
        success: true,
      }),
      {
        status: 201,
      }
    );
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
