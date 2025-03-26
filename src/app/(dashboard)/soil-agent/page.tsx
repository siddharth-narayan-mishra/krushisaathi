"use client";
import React, { useContext } from "react";
import Sidebar from "@/components/soilAgent/Sidebar";
import navigationContext from "@/context/NavigationContext";

const page = () => {
  const navContext = useContext(navigationContext);

  if (!navContext) {
    console.log("Navigation context is not provided", navContext);

    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }

  const { currentComponent } = navContext;

  return (
    <main className="lg:flex overflow-x-auto">
      <div>
        <Sidebar />
      </div>
      <div className="w-full ">{currentComponent}</div>
    </main>
  );
};

export default page;
