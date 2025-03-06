import { createContext } from "react";

interface UserContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  signup: (values: any) => void;
  logout: () => void;
  login: (values: any) => void;
  getUserData: () => void;
  user: any;
  isLoggedIn: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
