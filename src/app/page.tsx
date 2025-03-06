"use client";
import React, { useEffect, useContext } from "react";
import Sidebar from "../components/farmer/Sidebar";
import navigationContext from "@/context/navigationContext";

const page = () => {
  const navContext = useContext(navigationContext);

  if (!navContext) {
    console.log("Navigation context is not provided", navContext);

    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }

  const { currentComponent } = navContext;

  return (
    <main className="lg:flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">{currentComponent}</div>
    </main>
  );
};

export default page;
