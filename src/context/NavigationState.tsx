"use client";
import React, { useState, useEffect, ReactNode } from "react";
import NavigationContext from "./navigationContext";
import HomeComponent from "../components/farmer/HomeComponent";
import AccountComponent from "../components/farmer/AccountComponent";
import SettingsComponent from "../components/farmer/SettingsComponent";
import TestComponent from "../components/farmer/TestComponent";
import NewsComponent from "../components/farmer/NewsComponent";
import SupportComponent from "../components/farmer/SupportComponent";
import PrivacyComponent from "../components/farmer/PrivacyComponent";
import HelpComponent from "../components/farmer/HelpComponent";
import { useRouter } from "next/navigation";
import FarmersListComponent from "@/components/soilAgent/FarmersListComponent";
import AgentDashboardComponent from "@/components/soilAgent/AgentDashboardComponent";
import TestResultsComponent from "@/components/soilAgent/TestResultsComponent";

interface NavigationStateProps {
  children: ReactNode;
}

const NavigationState: React.FC<NavigationStateProps> = ({ children }) => {
  const router = useRouter();
  const [active, setActive] = useState<string>("");
  const [prevActive, setPrevActive] = useState<string>("home");
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <HomeComponent />
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleActiveChange = (active: string) => {
      switch (active) {
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
          setCurrentComponent(<TestResultsComponent />);
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
        setSidebarOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationState;
