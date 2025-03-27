import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const db = connectToFirebase();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const { sampleId, yardId, suggestions, fileUrl, nutrients } = body.result;

    // Validate required fields
    if (!sampleId) {
      return new NextResponse(
        JSON.stringify({ message: "Sample ID is required", success: false }),
        { status: 400 }
      );
    }

    if (!yardId) {
      return new NextResponse(
        JSON.stringify({ message: "Yard ID is required", success: false }),
        { status: 400 }
      );
    }

    // Directly reference the yard document using yardId
    const yardRef = doc(db, "yards", yardId);
    const yardDoc = await getDoc(yardRef);

    if (!yardDoc.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Yard not found", success: false }),
        { status: 404 }
      );
    }

    const yardData = yardDoc.data();

    if (!yardData.samples || !Array.isArray(yardData.samples)) {
      return new NextResponse(
        JSON.stringify({
          message: "No samples found in this yard",
          success: false,
        }),
        { status: 404 }
      );
    }

    // Update the specific sample
    const updatedSamples = yardData.samples.map((sample) =>
      sample.sampleId === sampleId
        ? { ...sample, pdfUrl: fileUrl, suggestions, nutrients }
        : sample
    );

    const sampleFound = updatedSamples.some(
      (sample) => sample.sampleId === sampleId
    );

    if (!sampleFound) {
      return new NextResponse(
        JSON.stringify({ message: "Sample not found in yard", success: false }),
        { status: 404 }
      );
    }

    // Update the yard document
    await updateDoc(yardRef, {
      samples: updatedSamples,
      updatedAt: new Date().toISOString(),
    });

    return new NextResponse(
      JSON.stringify({
        message: "Sample status updated successfully",
        yard: { id: yardId, ...yardData, samples: updatedSamples },
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating sample status:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        success: false,
      }),
      { status: 500 }
    );
  }
}
