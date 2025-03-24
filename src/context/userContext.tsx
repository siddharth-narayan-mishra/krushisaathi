import { LabModel } from "@/models/Labs";
import { UserModel } from "@/models/User";
import { createContext, ReactElement } from "react";

interface UserContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  signup: (values: any) => void;
  logout: () => void;
  login: (values: any) => void;
  getUserData: () => void;
  user: UserModel | ReactElement | LabModel | null;
  isLoggedIn: () => Promise<boolean>;
  getRecentResults: (id:string) => any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
