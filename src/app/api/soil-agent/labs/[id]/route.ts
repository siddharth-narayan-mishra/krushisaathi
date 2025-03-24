import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    console.log(id);
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "LabID is required", success: false }),
        {
          status: 400
        }
      );
    }

    const docRef = doc(db, "labs", id);
    console.log(docRef);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }

    if (!docSnap.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Lab not found", success: false }),
        {
          status: 404
        }
      );
    }

    const lab = { id: docSnap.id, ...docSnap.data() };

    return new NextResponse(JSON.stringify({ lab, success: true }), {
      status: 200
    });
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

export async function POST(req: NextRequest) {
  try {
    console.log("hi madam pie");
    const id = req.nextUrl.pathname.split("/").pop(); // Get the id from the URL
    console.log("id", id);
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "LabID is required", success: false }),
        {
          status: 400
        }
      );
    }

    const labRef = doc(db, "labs", id);
    const labSnap = await getDoc(labRef);
    // console.log(labSnap);
    if (labSnap.exists()) {
      console.log("Document data:", labSnap.data());
    } else {
      console.log("No such document!");
    }
    const { username, farmName, samples } = await req.json();
    // console.log(body);
    if (!labSnap.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Lab not found", success: false }),
        {
          status: 404
        }
      );
    }

    // const body = await req.json();
    // const  = body.values;
    console.log(username, farmName, samples);

    if (!username || !farmName || !samples) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data", success: false }),
        {
          status: 400
        }
      );
    }

    const SamplesData: { position: string; status: string }[] = [];
    samples.forEach((item: string) => {
      SamplesData.push({ position: item, status: "pending" });
    });

    await updateDoc(labRef, {
      users: arrayUnion({
        userId: username,
        farmName,
        sampleNames: SamplesData
      })
    });

    const updatedDocSnap = await getDoc(labRef);
    const updatedData = updatedDocSnap.data();

    return new NextResponse(
      JSON.stringify({
        message: "Sample registered successfully",
        success: true,
        data: updatedData
      }),
      {
        status: 201
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
