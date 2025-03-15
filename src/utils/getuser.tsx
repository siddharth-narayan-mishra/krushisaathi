import UserContext from "@/context/userContext";
import { LabModel } from "@/models/Labs";
import { UserModel } from "@/models/User";
import { useRouter } from "next/navigation";
import { ReactElement, useContext, useEffect } from "react";

export const UseUser = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }
  const { user } = userContext;
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return user;
};

export const isLabModel = (user: any): user is LabModel => {
  return user && "labName" in user && "users" in user;
};

export const getLabUsers = (
  user: UserModel | LabModel | ReactElement | null
) => {
  if (!user) return null;
  if (isLabModel(user)) {
    return user.users;
  }
  return null;
};
