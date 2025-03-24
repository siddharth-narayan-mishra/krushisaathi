"use client";
import React, { useEffect, useContext } from "react";
import Sidebar from "@/components/farmer/Sidebar";
import SoilTestResult from "@/components/farmer/soil-testing/SoilTestResult";

const page = () => {
  return (
    <main className="lg:flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <SoilTestResult />
      </div>
    </main>
  );
};

export default page;
