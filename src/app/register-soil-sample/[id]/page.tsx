"use client";
import React, { useEffect, useContext, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/farmer/Sidebar";
import navigationContext from "@/context/navigationContext";
import labContext from "@/context/labContext";
import UserContext from "@/context/userContext";
import { Globe, ArrowLeft, Tractor } from "lucide-react";
import RegistrationForm from "@/components/farmer/soil-testing/RegisterationForm";

const Page = () => {
  const navContext = useContext(navigationContext);
  const labcontext = useContext(labContext);
  const userContext = useContext(UserContext);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [lab, setLab] = useState<any>({});
  const [createdYard, setCreatedYard] = useState(null);

  if (!navContext || !labcontext || !userContext) {
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

  const { setActive, prevActive } = navContext;
  const { getLab } = labcontext;
  const { user } = userContext;

  useEffect(() => {
    if (!id) {
      console.error("Location is not provided");
      return;
    }

    getLab(id).then((data) => {
      setLab(data);
    });
  }, [id, getLab]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-64 bg-white shadow-sm border-r border-gray-200">
          <Sidebar />
        </div>

        <main className="flex-1">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActive(prevActive)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h1 className="text-xl font-semibold text-gray-800">
                    Soil Sample Registration
                  </h1>
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  aria-label="Change language"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Enter Soil Sample Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Please fill in all the required information for your soil sample analysis.
                  </p>
                </div>
                <RegistrationForm setCreatedYard={setCreatedYard} lab={lab} user={user} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;