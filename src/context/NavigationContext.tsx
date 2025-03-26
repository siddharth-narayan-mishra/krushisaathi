import { createContext } from "react";

// Define the type for the context value
interface NavigationContextType {
  active: string;
  setActive: (route: string) => void;
  prevActive: string;
  setPrevActive: (route: string) => void;
  currentComponent: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
// Create the context with a default value
const navigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export default navigationContext;
