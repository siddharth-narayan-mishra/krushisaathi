"use client";
import React, { useContext } from "react";
import Sidebar from "../components/common/Sidebar";
import navigationContext from "@/context/NavigationContext";
import VoiceChat from "@/components/voice-chat/voiceChat";

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
      <VoiceChat />
    </main>
  );
};

export default page;
