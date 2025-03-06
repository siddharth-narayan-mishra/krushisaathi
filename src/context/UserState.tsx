"use client";
import React, { useState, ReactNode } from "react";
import UserContext from "./userContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterationStateProps {
  children: ReactNode;
}

const RegisterationState: React.FC<RegisterationStateProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const logout = async () => {
    try {
      if (!(await isLoggedIn())) {
        return;
      }
      setLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("logout data", data);
      if (data.success) {
        console.log("logout success");
        toast.success(data.message);
      }
      router.push("/login");
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error: " + error);
    }
  };

  const signup = async (values: any) => {
    try {
      if (await isLoggedIn()) {
        router.push("/");
        return;
      }
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("signup data", data);

      if (data.success) {
        toast.success(data.message);
      }
      router.push("/login");
    } catch (error) {
      toast.error("Error: " + error);
      console.error("Error:", error);
    } finally {
      console.log(setLoading(false));
    }
  };

  const login = async (values: any) => {
    try {
      if (await isLoggedIn()) {
        router.push("/");
        return;
      }
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("Login Error: ", error);
      toast.error("Invalid credentials: " + error);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      const response = await fetch("/api/user/checkAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error: " + error);
      return false;
    }
  };

  const getUserData = async () => {
    try {
      if (!(await isLoggedIn())) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        if (data.user !== user) {
          setUser(data.user);
        }
      } else if (data.message === "User not authenticated") {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error: " + error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        logout,
        signup,
        login,
        getUserData,
        user,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default RegisterationState;
