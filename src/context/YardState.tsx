"use client";
import React, { useState, ReactNode } from "react";
import LabContext from "./labContext";
import toast from "react-hot-toast";
import YardContext from "./yardContext";
import { FormValues } from "@/components/soilAgent/TestResultsComponent";

interface YardStateProps {
  children: ReactNode;
}

const getYards = async (id:string, role:string) => {
  try {
    var url = `api/yards?${role}=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      return data.yards;
    }
    return;
  } catch (error) {
    console.log("Error:", error);
    toast.error("Error: " + error);
  }
};

const getYard = async (id: string) => {
  try {
    var url = "/api/yards/" + id;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      return data.yard;
    }
  } catch (error) {
    console.log("Error: ", error);
    toast.error("Error: " + error);
  }
};

const updateYardStatus = async ({
  labId,
  userId,
  status,
  sampleId
}: {
  labId: string;
  userId: string;
  status: "pending" | "in-process" | "completed";
  sampleId: string;
}) => {
  try {
    const url = "/api/yards/status";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sampleId,
        labId,
        userId,
        status
      })
    });

    const data = await response.json();
    console.log("Status update response:", data);

    if (data.success) {
      toast.success(`Sample status updated to ${status}`);
      return data.yard;
    } else {
      toast.error(data.message || "Failed to update status");
      return null;
    }
  } catch (error) {
    console.log("Error updating yard status: ", error);
    toast.error(
      `Error updating status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
};

const sendYardReport = async (result: FormValues) => {
  try {
    const url = "/api/yards/sendReport";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        result
      })
    });

    const data = await response.json();
    console.log("Report sending response:", data);

    if (data.success) {
      toast.success("Report sent successfully");
      return true;
    } else {
      toast.error(data.message || "Failed to send report");
      return false;
    }
  } catch (error) {
    console.log("Error sending yard report: ", error);
    toast.error(
      `Error sending report: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return false;
  }
};

// const registerSample = async (values: any) => {
//   try {
//     var url = `/api/soil-agent/labs`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(values)
//     });
//     const data = await response.json();
//     if (data.success) {
//       return data;
//     }
//   } catch (error) {
//     toast.error("Error: " + error);
//   }
// };

const YardState: React.FC<YardStateProps> = ({ children }) => {
  return (
    <YardContext.Provider
      value={{ getYards, getYard, updateYardStatus, sendYardReport }}
    >
      {children}
    </YardContext.Provider>
  );
};

export default YardState;
