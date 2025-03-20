import { createContext } from "react";
// TODO
// Define the type for the context value
interface LabContextType {
  getLabs: () => Promise<any>;
  getLab: (id: string) => Promise<any>;
  registerSample: (values: any) => Promise<any>;
}
// Create the context with a default value
const labContext = createContext<LabContextType | undefined>(undefined);

export default labContext;
