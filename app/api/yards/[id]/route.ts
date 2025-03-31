import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/lib/firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "yardId is required", success: false }),
        {
          status: 400,
        }
      );
    }

    const yardCollection = collection(db, "yards");
    const yardQuery = query(yardCollection, where("yardId", "==", id));
    const querySnapshot = await getDocs(yardQuery);
    const yardDoc = querySnapshot.docs[0];

    console.log(yardDoc);

    if (!yardDoc.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "yard not found", success: false }),
        {
          status: 404,
        }
      );
    }

    const yard = { id: yardDoc.id, ...yardDoc.data() };

    return new NextResponse(JSON.stringify({ yard: yard, success: true }), {
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

export async function PUT(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { sampleId, status, yardId, userId } = body;

    // Validate required fields
    const requiredFields = [
      { field: sampleId, message: "Sample ID is required" },
      { field: yardId, message: "Yard ID is required" },
      { field: status, message: "Status is required" },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        return new NextResponse(JSON.stringify({ message, success: false }), {
          status: 400,
        });
      }
    }

    // Validate status
    const validStatuses = ["pending", "in-process", "completed"];
    if (!validStatuses.includes(status)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid status value",
          validStatuses,
          success: false,
        }),
        { status: 400 }
      );
    }

    // Retrieve yard document
    const yardRef = doc(db, "yards", yardId);
    const yardSnapshot = await getDoc(yardRef);

    // Check if yard exists
    if (!yardSnapshot.exists()) {
      return new NextResponse(
        JSON.stringify({ message: "Yard not found", success: false }),
        { status: 404 }
      );
    }

    const yardData = yardSnapshot.data();

    // Validate samples
    if (!yardData.samples || !Array.isArray(yardData.samples)) {
      return new NextResponse(
        JSON.stringify({
          message: "No samples found in this yard",
          success: false,
        }),
        { status: 404 }
      );
    }

    // Find and update the specific sample
    const updatedSamples = yardData.samples.map((sample) =>
      sample.sampleId === sampleId ? { ...sample, status } : sample
    );

    // Verify sample was found
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
      updatedBy: userId || "system",
    });

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: "Sample status updated successfully",
        yard: {
          id: yardId,
          ...yardData,
          samples: updatedSamples,
        },
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Log and handle any unexpected errors
    console.error("Error updating sample status:", error);
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: false,
      }),
      { status: 500 }
    );
  }
}
