"use client";
import React, { useEffect, useContext } from "react";
import Sidebar from "@/components/farmer/Sidebar";

const page = () => {
  return (
    <main className="lg:flex ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        Soil Results
      </div>
    </main>
  );
};

export default page;
