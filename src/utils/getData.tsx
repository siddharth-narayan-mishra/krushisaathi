import UserContext from "@/context/userContext";
import YardContext from "@/context/yardContext";
import { LabModel } from "@/models/Labs";
import { UserModel } from "@/models/User";
import { YardModel } from "@/models/Yard";
import { useRouter } from "next/navigation";
import { ReactElement, useContext, useEffect } from "react";

export const UseUser = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    console.error("User context is not provided");
    return null;
  }

  const { user } = userContext;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  console.log(user);
  return user;
};

export const isLabModel = (user: any): user is LabModel => {
  return user && "labName" in user && "users" in user;
};

export const getLabId = (user: UserModel | LabModel | ReactElement | null) => {
  if (!user) return null;
  if (isLabModel(user)) {
    return user.id;
  }
  return null;
};

export const GetAllYards = async () => {
  const yardsContext = useContext(YardContext);

  if (!yardsContext) {
    throw new Error("YardContext must be used within a YardProvider");
  }

  const allyardsData = await yardsContext.getYards();
  return allyardsData;
};

export const GetYardData = async (id: string): Promise<YardModel> => {
  const yardContext = useContext(YardContext);

  if (!yardContext) {
    throw new Error("YardContext must be used within a YardProvider");
  }

  const yardData = await yardContext.getYard(id);
  console.log(yardData);
  return yardData;
};
