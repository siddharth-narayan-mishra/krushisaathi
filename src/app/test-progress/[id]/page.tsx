import React from "react";
import Sidebar from "@/components/farmer/Sidebar";
import SoilTestProgress from "@/components/farmer/soil-testing/SoilTestProgress";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="lg:flex ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        {params.id ? (
          <SoilTestProgress yardId={params.id} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Page;
