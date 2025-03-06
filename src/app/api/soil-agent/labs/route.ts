import { NextRequest, NextResponse } from "next/server";
import { connectToFirebase } from "@/utils/FirebaseConfig";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { Lab } from "@/models/Labs";

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
    const body: Lab = await req.json();
    const { name, position, address, phone } = body;

    console.log(name, position, address, phone);

    if (!name || !position || !address || !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    const doc = await addDoc(collection(db, "labs"), {
      name,
      position,
      address,
      phone,
    });

    return new NextResponse(
      JSON.stringify({ message: "Lab Created Successfully", success: true }),
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
