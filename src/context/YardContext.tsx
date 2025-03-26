import { FormValues } from "@/components/soilAgent/TestResultsComponent";
import { createContext } from "react";

interface YardContextType {
  getYards: (id:string, type:string) => Promise<any>;
  getYard: (id: string) => Promise<any>;
  updateYardStatus: ({
    yardId,
    status,
    sampleId
  }: {
    yardId: string;
    sampleId: string;
    status: "pending" | "in-process" | "completed";
  }) => Promise<any>;
  sendYardReport: (result: FormValues) => Promise<boolean>;
}

const YardContext = createContext<YardContextType | undefined>(undefined);

export default YardContext;
