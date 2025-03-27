import React from "react";
import Sidebar from "@/components/common/Sidebar";
import SoilTestProgress from "@/components/soilTestingRegistration/SoilTestProgress";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;

  return (
    <main className="lg:flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        {resolvedParams.id ? (
          <SoilTestProgress yardId={resolvedParams.id} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Page;
