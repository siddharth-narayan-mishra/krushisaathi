"use client";
import React, { useState, useEffect, ReactNode } from "react";
import NavigationContext from "./NavigationContext";
import HomeComponent from "../components/farmerDashboard/HomeComponent";
import AccountComponent from "../components/farmerDashboard/AccountComponent";
import SettingsComponent from "../components/farmerDashboard/SettingsComponent";
import TestComponent from "../components/farmerDashboard/TestComponent";
import NewsComponent from "../components/farmerDashboard/NewsComponent";
import SupportComponent from "../components/farmerDashboard/SupportComponent";
import PrivacyComponent from "../components/farmerDashboard/PrivacyComponent";
import HelpComponent from "../components/farmerDashboard/HelpComponent";
import FarmersListComponent from "@/components/soilAgent/FarmersListComponent";
import AgentDashboardComponent from "@/components/soilAgent/AgentDashboardComponent";
import TestResultsComponent from "@/components/soilAgent/TestResultsComponent";

interface NavigationStateProps {
  children: ReactNode;
}

const NavigationState: React.FC<NavigationStateProps> = ({ children }) => {
  const [active, setActive] = useState<string>("");
  const [prevActive, setPrevActive] = useState<string>("home");
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <HomeComponent />
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleActiveChange = (active: string) => {
      const [basePath, queryString] = active.includes("?")
        ? active.split("?")
        : [active, ""];
      const params = new URLSearchParams(queryString || "");
      console.log(params);

      switch (basePath) {
        case "account":
          setCurrentComponent(<AccountComponent />);
          break;
        case "settings":
          setCurrentComponent(<SettingsComponent />);
          break;
        case "test":
          setCurrentComponent(<TestComponent />);
          break;
        case "news":
          setCurrentComponent(
            <NewsComponent setActive={setActive} prevActive={prevActive} />
          );
          break;
        case "support":
          setCurrentComponent(<SupportComponent />);
          break;
        case "privacy":
          setCurrentComponent(<PrivacyComponent />);
          break;
        case "help":
          setCurrentComponent(<HelpComponent />);
          break;
        case "testResults":
          setCurrentComponent(
            <TestResultsComponent
              yardId={params.get("yardId") || ""}
              sampleId={params.get("sampleId") || ""}
            />
          );
          break;
        case "agentDashbaord":
          setCurrentComponent(<AgentDashboardComponent />);
          break;
        case "farmersList":
          setCurrentComponent(<FarmersListComponent />);
          break;
        default:
          setCurrentComponent(<HomeComponent />);
      }
    };

    handleActiveChange(active);
  }, [active]);

  return (
    <NavigationContext.Provider
      value={{
        active,
        setActive,
        prevActive,
        setPrevActive,
        currentComponent,
        sidebarOpen,
        setSidebarOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationState;
