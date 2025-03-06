"use client";
import React, { use, useContext, useEffect, useState } from "react";
import account_active from "../../../public/assets/icons/Account_active.svg";
import help_active from "../../../public/assets/icons/Help_active.svg";
import home_active from "../../../public/assets/icons/Home_active.svg";
import news_active from "../../../public/assets/icons/News_active.svg";
import support_active from "../../../public/assets/icons/Support_active.svg";
import privacy_active from "../../../public/assets/icons/Privacy_active.svg";
import settings_active from "../../../public/assets/icons/Settings_active.svg";
import test_active from "../../../public/assets/icons/Test_active.svg";
import account from "../../../public/assets/icons/Account.svg";
import help from "../../../public/assets/icons/Help.svg";
import home from "../../../public/assets/icons/Home.svg";
import news from "../../../public/assets/icons/News.svg";
import support from "../../../public/assets/icons/Support.svg";
import privacy from "../../../public/assets/icons/Privacy.svg";
import settings from "../../../public/assets/icons/Settings.svg";
import logoutIcn from "../../../public/assets/icons/logout.svg";
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
    handleChange("home");
  }, []);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { logout } = userContext;
  return (
    <>
      {/* // Desktop Sidebar */}
      <div
        className={`relative ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden lg:block h-screen overflow-y-auto border-r-2 ${
          sidebarOpen ? "border-r-primary_green" : "border-gray-300"
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
            onClick={() => handleChange("home")}
            className={`flex ${
              active === "home"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "home" ? home_active : home}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Home"
            />
            {sidebarOpen ? "Home" : " "}
          </button>
          <button
            onClick={() => handleChange("account")}
            className={`flex ${
              active === "account"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "account" ? account_active : account}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Account"
            />
            {sidebarOpen ? "Account" : " "}
          </button>
          <button
            onClick={() => handleChange("settings")}
            className={`flex ${
              active === "settings"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "settings" ? settings_active : settings}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Settings"
            />
            {sidebarOpen ? "Settings" : " "}
          </button>
          <button
            onClick={() => handleChange("test")}
            className={`flex ${
              active === "test"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "test" ? test_active : test}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Test"
            />
            {sidebarOpen ? "Soil Analysis" : " "}
          </button>
          <button
            onClick={() => handleChange("news")}
            className={`flex ${
              active === "news"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "news" ? news_active : news}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="News"
            />
            {sidebarOpen ? "News Feed" : " "}
          </button>
          <button
            onClick={() => handleChange("support")}
            className={`flex ${
              active === "support"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "support" ? support_active : support}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Support"
            />
            {sidebarOpen ? "Help and Support" : " "}
          </button>
          <button
            onClick={() => handleChange("privacy")}
            className={`flex ${
              active === "privacy"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "privacy" ? privacy_active : privacy}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="Privacy"
            />
            {sidebarOpen ? "Privacy Policy" : " "}
          </button>
          <button
            onClick={() => handleChange("help")}
            className={`flex ${
              active === "help"
                ? `active-side-button ${sidebarOpen ? "w-56" : ""}`
                : `side-button ${sidebarOpen ? "w-56" : ""}`
            }`}
          >
            <Image
              priority
              className="mr-3 my-auto "
              color="red"
              src={active === "help" ? help_active : help}
              width={sidebarOpen ? 20 : 30}
              height={sidebarOpen ? 20 : 30}
              alt="FAQs"
            />
            {sidebarOpen ? "FAQs" : " "}
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
            <button
              onClick={() => setActive("account")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={account}
                  width={25}
                  height={25}
                  alt="Account"
                />
                Account
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Account"
              />
            </button>
            <button
              onClick={() => setActive("settings")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={settings}
                  width={30}
                  height={30}
                  alt="Settings"
                />
                Settings
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Settings"
              />
            </button>
            <button
              onClick={() => setActive("test")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={active === "test" ? test_active : test}
                  width={30}
                  height={30}
                  alt="Test"
                />
                Soil Analysis
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Test"
              />
            </button>
            <button
              onClick={() => setActive("news")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={active === "news" ? news_active : news}
                  width={30}
                  height={30}
                  alt="News"
                />
                News Feed
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="News"
              />
            </button>
            <button
              onClick={() => setActive("support")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={active === "support" ? support_active : support}
                  width={30}
                  height={30}
                  alt="Support"
                />
                Help and Support
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Support"
              />
            </button>
            <button
              onClick={() => setActive("privacy")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={active === "privacy" ? privacy_active : privacy}
                  width={30}
                  height={30}
                  alt="Privacy"
                />
                Privacy Policy
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="Privacy"
              />
            </button>
            <button
              onClick={() => setActive("help")}
              className="side-button-mobile"
            >
              <span className="flex">
                <Image
                  priority
                  className="mr-3 my-auto "
                  src={active === "help" ? help_active : help}
                  width={30}
                  height={30}
                  alt="FAQs"
                />
                FAQs
              </span>
              <Image
                priority
                className="mr-3 my-auto "
                src={right_arrow}
                width={18}
                height={18}
                alt="FAQs"
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
    </>
  );
};

export default Sidebar;
