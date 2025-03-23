import { createContext } from "react";

interface YardContextType {
  getYards: () => Promise<any>;
  getYard: (id: string) => Promise<any>;
  updateYardStatus: ({
    labId,
    userId,
    status,
    sampleId
  }: {
    labId: string;
    userId: string;
    sampleId: string;
    status?: "pending" | "in-process" | "completed" | undefined;
  }) => Promise<any>;
  sendYardReport: ({
    labId,
    userId
  }: {
    labId: string;
    userId: string;
  }) => Promise<boolean>;
  //   registerSample: (values: any) => Promise<any>;
}

const YardContext = createContext<YardContextType | undefined>(undefined);

export default YardContext;
