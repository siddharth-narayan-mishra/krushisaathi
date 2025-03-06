"use client";
import React, { useContext, useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import logo from "../../../public/assets/images/logo.png";
import globe from "../../../public/assets/icons/globe.svg";
import arrowDown from "../../../public/assets/icons/arrowDown.svg";
import Link from "next/link";
import UserContext from "@/context/userContext";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    console.log("User context is not provided", userContext);

    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const { isLoggedIn } = userContext;

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        router.push("/");
      }
    });
  }, []);

  return (
    <section className="h-screen flex overflow-hidden">
      <div className="w-full lg:w-[40%] px-20 content-center h-screen overflow-y-auto ">
        <Image src={logo} alt="Krushi Saathi Logo" className=" mx-auto" />
        <SignupForm />
        <div className="flex justify-center content-center mt-6">
          <hr className="my-auto border border-[#6378659C] w-full" />
          <span className="mx-5 text-[#6378659C]">or</span>
          <hr className="my-auto border border-[#6378659C] w-full" />
        </div>
        <Link href="/login">
          <h2 className="text-center font-semibold text-[#49624B] text-lg my-6 hover:underline">
            Login
          </h2>
        </Link>
      </div>
      <div
        className="w-0 lg:w-[60%] bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url('/assets/images/mission.png')`,
        }}
      >
        <button className="flex bg-secondary_green content-center rounded-lg px-5 py-0.5 m-3">
          <Image
            className="my-auto mr-2"
            priority
            src={globe}
            width={20}
            height={20}
            alt="globe"
          />{" "}
          English{" "}
          <Image
            priority
            className="my-auto ml-20"
            width={15}
            height={15}
            src={arrowDown}
            alt="down"
          />
        </button>

        <h1 className="h-full w-full text-center justify-center content-center ">
          <p className="text-white text-4xl">Mission Statement</p>
        </h1>
      </div>
    </section>
  );
};

export default page;
