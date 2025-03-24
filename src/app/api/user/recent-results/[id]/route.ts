import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const db = connectToFirebase();

// get completed recent results data
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split("/").pop();
    console.log(userId);
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "UserId is required", success: false }),
        {
          status: 400
        }
      );
    }

    const yardsRef = collection(db, "yards");
    const q = query(yardsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ message: "No yards found for the given userId", success: false }),
        {
          status: 404
        }
      );
    }

    const yards = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const completedSamples = data.samples.filter((sample: { status: string; }) => sample.status === "completed");
      return { ...data, samples: completedSamples };
    }).filter(yard => yard.samples.length > 0);

    return new NextResponse(
      JSON.stringify({ yards, success: true }),
      {
        status: 200
      }
    );

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({ error: errorMessage, success: false }),
      {
        status: 500
      }
    );
  }
}