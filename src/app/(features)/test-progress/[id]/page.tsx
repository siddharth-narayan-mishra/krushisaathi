"use client";
import React from "react";
import Sidebar from "@/components/common/Sidebar";
import SoilTestProgress from "@/components/soilTestingRegistration/SoilTestProgress";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="lg:flex">
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
