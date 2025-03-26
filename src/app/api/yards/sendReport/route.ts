import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

const db = connectToFirebase();

export async function PUT(req: NextRequest) {
  try {
    // console.log("hii");
    const body = await req.json();
    console.log(body);

    const { sampleId, userId, suggestions, labId, fileUrl } = body.result;

    if (!sampleId) {
      return new NextResponse(
        JSON.stringify({ message: "Sample ID is required", success: false }),
        { status: 400 }
      );
    }

    // if (!status) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Status is required", success: false }),
    //     { status: 400 }
    //   );
    // }

    // const validStatuses = ["pending", "in-process", "completed"];
    // if (!validStatuses.includes(status)) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Invalid status value", success: false }),
    //     { status: 400 }
    //   );
    // }

    const yardCollection = collection(db, "yards");
    const yardQuery = query(yardCollection, where("labId", "==", labId));
    const querySnapshot = await getDocs(yardQuery);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ message: "Yard not found", success: false }),
        { status: 404 }
      );
    }

    const yardDoc = querySnapshot.docs[0];
    console.log(yardDoc);
    const yardRef = doc(db, "yards", yardDoc.id);
    const yardData = yardDoc.data();

    if (!yardData.samples || !Array.isArray(yardData.samples)) {
      return new NextResponse(
        JSON.stringify({
          message: "No samples found in this yard",
          success: false
        }),
        { status: 404 }
      );
    }
    const updatedSamples = yardData.samples.map((sample: any) =>
      sample.sampleId === sampleId
        ? { ...sample, pdfUrl: fileUrl, suggestions }
        : sample
    );

    const sampleFound = updatedSamples.some(
      (sample: any) => sample.sampleId === sampleId
    );

    if (!sampleFound) {
      return new NextResponse(
        JSON.stringify({ message: "Sample not found in yard", success: false }),
        { status: 404 }
      );
    }

    await updateDoc(yardRef, {
      samples: updatedSamples,
      updatedAt: new Date().toISOString(),
      updatedBy: userId || "system"
    });

    return new NextResponse(
      JSON.stringify({
        message: "Sample status updated successfully",
        yard: { id: yardDoc.id, ...yardData, samples: updatedSamples },
        success: true
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating sample status:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        success: false
      }),
      { status: 500 }
    );
  }
}
