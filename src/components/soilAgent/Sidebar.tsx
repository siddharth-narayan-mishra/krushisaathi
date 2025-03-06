"use client";
import React, { use, useContext, useEffect, useState } from "react";
import home_active from "../../../public/assets/icons/Home_active.svg";
import list_active from "../../../public/assets/icons/News_active.svg";
import test_active from "../../../public/assets/icons/Test_active.svg";
import home from "../../../public/assets/icons/Home.svg";
import logoutIcn from "../../../public/assets/icons/logout.svg";
import list from "../../../public/assets/icons/News.svg";
import test from "../../../public/assets/icons/Test.svg";
// import logo from "../../../public/assets/images/logo.png";
import right_arrow from "../../../public/assets/icons/right_arrow.svg";
// import logo_small from "../../../public/assets/images/logo_small.png";
import Image from "next/image";
import navigationContext from "@/context/navigationContext";
import UserContext from "@/context/userContext";
import { logo, logo_small } from "@/config/ImagesUrl";

const Sidebar = () => {
  const navContext = useContext(navigationContext);

  if (!navContext) {
    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }
  const { active, setActive, setPrevActive, sidebarOpen, setSidebarOpen } =
    navContext;
  const [showSidebar, setShowSidebar] = useState(false);

  const handleChange = (component: string) => {
    if (setPrevActive) setPrevActive(active);
    setActive(component);
  };

  useEffect(() => {
    handleChange("agentDashbaord");
  }, []);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { logout } = userContext;
  return (
    <div className="">
      {/* // Desktop Sidebar */}

      <div
        className={`relative ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden lg:block h-screen overflow-y-auto border-r-2 ${
          sidebarOpen ? "" : "border-gray-300"
        } `}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-0 right-0 text-primary_green bg-gray-200 p-2 "
        >
          {sidebarOpen ? "<" : ">"}
        </button>
        <Image
          src={sidebarOpen ? logo : logo_small}
          alt="Krushi Saathi Logo"
          width={sidebarOpen ? 300 : 70}
          height={sidebarOpen ? 300 : 70}
          className={`${sidebarOpen ? "" : "mt-10 mb-16"}`}
        />
        <div
          className={`${
            sidebarOpen ? "w-[200px]" : "w-[50px]"
          } mx-auto space-y-3`}
        >
          <button
            onClick={() => handleChange("agentDashbaord")}
            className={`flex ${
              active === "agentDashbaord"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "agentDashbaord" ? home_active : home}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Home"
            />
            {sidebarOpen ? "Dashboard" : " "}
          </button>
          <button
            onClick={() => handleChange("farmersList")}
            className={`flex ${
              active === "farmersList"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "farmersList" ? list_active : list}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="List"
            />
            {sidebarOpen ? "Farmers" : " "}
          </button>

          <button
            onClick={() => handleChange("testResults")}
            className={`flex ${
              active === "testResults"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "testResults" ? test_active : test}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Test"
            />
            {sidebarOpen ? "Test" : " "}
          </button>
          <button onClick={() => logout()} className="flex side-button">
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={logoutIcn}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="logout"
            />
            {sidebarOpen ? "Logout" : " "}
          </button>
        </div>
      </div>

      {/* // Mobile Sidebar */}
      <nav className="flex lg:hidden border-b-2 border-b-primary_green">
        <button
          className="absolute z-30 m-4 space-y-2"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? (
            <>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
            </>
          ) : (
            <>
              <span className="text-2xl ml-2 mb-1 ">X</span>
            </>
          )}
        </button>
        <div className="mx-auto my-3">
          {/* <Image src={logo_small} width={100} height={100} alt="Krushi Saathi Logo" className=" mx-auto" /> */}

          <h3 className="text-primary_black font-bold text-2xl">
            krushisaathi
          </h3>
        </div>

        <div
          className={`absolute z-20 transform duration-100 top-0 bg-white h-fit ${
            showSidebar ? "left-0" : "-left-[410px]"
          }`}
        >
          <h2 className="w-full mx-auto py-3 text-center text-2xl border-b-2 border-b-primary_green font-bold text-primary_black">
            Menu
          </h2>
          <div className="w-full space-y-10 my-10 mx-3">
            <button
              onClick={() => setActive("home")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={home}
                  width={30}
                  height={30}
                  alt="Home"
                />
                Home
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={12}
                height={12}
                alt="Home"
              />
            </button>
            <button onClick={() => logout()} className="side-button-mobile">
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={logoutIcn}
                  width={30}
                  height={30}
                  alt="logout"
                />
                Logout
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Logout"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
