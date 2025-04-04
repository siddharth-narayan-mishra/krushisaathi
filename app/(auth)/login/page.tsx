"use client";
import React, { useContext } from "react";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import { logo, mission } from "@/config/ImagesUrl";
import { Tractor, Sprout } from "lucide-react";

const LoginPage = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-sm mx-auto">
          <Tractor className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            System Error
          </h2>
          <p className="text-gray-600">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full lg:w-[45%] flex flex-col mb-6">
        <div className="px-6 flex justify-between items-center">
          <Image
            src={logo}
            alt="Krushi Saathi Logo"
            height={100}
            width={100}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Login to access your farming insights
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">New to Krushi Saathi?</p>
              <Link
                href="/signup"
                className="mt-2 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                <Sprout className="w-4 h-4 mr-2" />
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Mission Statement */}
      <div className="hidden lg:block lg:w-[55%] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${mission})`,
          }}
        >
          <div className="h-full flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-6">Empowering Farmers</h2>
            <p className="text-xl text-center max-w-2xl leading-relaxed">
              Krushi Saathi is committed to revolutionizing agriculture through
              technology, providing farmers with the tools and insights they
              need to make informed decisions and achieve better yields.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold">10,000+</h3>
                  <p className="text-sm mt-1">Farmers Served</p>
                </div>
              </div>
              <div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold">50,000+</h3>
                  <p className="text-sm mt-1">Soil Tests</p>
                </div>
              </div>
              <div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold">20+</h3>
                  <p className="text-sm mt-1">States Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
