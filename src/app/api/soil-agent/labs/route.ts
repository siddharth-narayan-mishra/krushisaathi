import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import { Yard } from "@/models/Yard";
import { v4 } from "uuid";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const labsCollection = collection(db, "labs");
    const labsSnapshot = await getDocs(labsCollection);
    const labsList = labsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new NextResponse(JSON.stringify({ labs: labsList, success: true }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error, success: false }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Yard = await req.json();
    const { yardName, samples, labId, userId } = body;
    const generateId = () => {
      const prefix = "ST";
      const number = Math.floor(10000 + Math.random() * 90000);
      return prefix + number;
    };

    const SamplesData = samples.map((sample) => ({
      sampleId: generateId(),
      sampleName: sample,
      status: "registered",
    }));

    const yardId = v4();

    const yardData = {
      yardName,
      samples: SamplesData,
      labId,
      userId,
      yardId,
    };

    await setDoc(doc(db, "yards", yardId), yardData);

    return new NextResponse(
      JSON.stringify({
        message: "Yard created successfully",
        createdYard: yardData,
        success: true,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({ message: "Internal Error", success: false }),
      {
        status: 500,
      }
    );
  }
}
