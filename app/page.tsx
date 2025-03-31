"use client";
import React, { useContext, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import navigationContext from "@/context/NavigationContext";
// import VoiceChat from "@/components/farmerDashboard/VoiceChat";
import { LandingTransition } from "@/components/landing";

const Page = () => {
  const navContext = useContext(navigationContext);
  const [isTrue, setIsTrue] = useState(false);

  if (!navContext) {
    console.log("Navigation context is not provided", navContext);

    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }

  const { currentComponent } = navContext;

  return (
    <>
      {isTrue ? (
        <main className="lg:flex">
          <div>
            <Sidebar />
          </div>
          <div className="w-full">{currentComponent}</div>
          {/* <VoiceChat /> */}
        </main>
      ) : (
        <LandingTransition setIsTrue={setIsTrue} />
      )}
    </>
  );
};

export default Page;
