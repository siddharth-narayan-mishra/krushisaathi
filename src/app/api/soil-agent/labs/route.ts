import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { Lab } from "@/models/Labs";
import { Yard } from "@/models/Yard";
import { v4 } from "uuid";

const db = connectToFirebase();

export async function GET(req: NextRequest) {
  try {
    const labsCollection = collection(db, "labs");
    const labsSnapshot = await getDocs(labsCollection);
    const labsList = labsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return new NextResponse(JSON.stringify({ labs: labsList, success: true }), {
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error, success: false }), {
      status: 500
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Yard = await req.json();
    const { yardName ,samples,labId,userId } = body;
    const generateId = () => {
      const timestamp = Date.now().toString().slice(-5);
      return `ST${timestamp}`;
    };

    const generatedId = generateId();
    const SampleId = generatedId;

    const SamplesData = samples.map((sample) => ({
      sampleId: SampleId,
      sampleName: sample,
      status: "pending"
    }));
     


    const yardId = v4()

    const docRef = await addDoc(collection(db, "yards"), {
      yardName,
      samples: SamplesData,
      labId,
      userId,
      yardId
    });
    
    return new NextResponse(
      JSON.stringify({ message: "Sample Registered Successfully", success: true }),
      { status: 201 }
    );
    } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({ message: "Internal Error", success: false }),
      {
        status: 500
      }
    );
  }
}
