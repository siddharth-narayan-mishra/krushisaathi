"use client";
import React, { useState, ReactNode } from "react";
import LabContext from "./LabContext";
import toast from "react-hot-toast";

interface LabStateProps {
  children: ReactNode;
}

const getLabs = async () => {
  try {
    var url = "api/soil-agent/labs";
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return data.labs;
    }
    return;
  } catch (error) {
    console.log("Error:", error);
    toast.error("Error: " + error);
  }
};

const getLab = async (id: string) => {
  try {
    var url = "/api/soil-agent/labs/" + id;
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return data.lab;
    }
  } catch (error) {
    console.log("Error: ", error);
    toast.error("Error: " + error);
  }
};

const registerSample = async (values: any) => {
  try {
    var url = `/api/soil-agent/labs`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data.success) {
      return data;
    }
  } catch (error) {
    toast.error("Error: " + error);
  }
};

const LabState: React.FC<LabStateProps> = ({ children }) => {
  return (
    <LabContext.Provider value={{ getLabs, getLab, registerSample }}>
      {children}
    </LabContext.Provider>
  );
};

export default LabState;
