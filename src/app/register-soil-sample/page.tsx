"use client";

import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, MapPin, Navigation2, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleMap from "../../components/soilTesting/GoogleMap";
import Sidebar from "@/components/farmerDashboard/Sidebar";
import UserContext from "@/context/userContext";
import LabContext from "@/context/labContext";
import navigationContext from "@/context/navigationContext";

const Page = () => {
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  const router = useRouter();
  const subscriptionKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const navContext = useContext(navigationContext);
  const userContext = useContext(UserContext);
  const labContext = useContext(LabContext);

  if (!subscriptionKey) {
    console.error("Google Maps subscription key is not defined in .env.local");
    return <div>Error: Google Maps subscription key is not defined.</div>;
  }

  if (!navContext || !userContext || !labContext) {
    console.error("Required context is not provided");
    return <div>Error: Required context is not provided.</div>;
  }

  const { getLabs } = labContext;

  useEffect(() => {
    getLabs().then((data) => {
      if (data) {
        setLocations(data);
      }
    });
  }, [getLabs]);

  const handleProceedClick = (id: string) => {
    router.push(`/register-soil-sample/${id}`);
  };

  const getDirections = (position: { latitude: number; longitude: number }) => {
    if (position && position.latitude && position.longitude) {
      setDestination(position);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-fit">
        <Sidebar />
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Lab List */}
        <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Testing Centers</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {locations.map((lab) => (
              <div
                key={lab.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${selectedLab === lab.id ? 'bg-green-50' : ''
                  }`}
                onClick={() => setSelectedLab(lab.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80"
                      alt={lab.labName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{lab.labName}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{lab.address.district}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{lab.phone}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(lab.position);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Navigation2 className="w-4 h-4" />
                        Directions
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProceedClick(lab.id);
                        }}
                        className="flex items-center px-4 py-1.5 text-sm text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                      >
                        Select Center
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1">
          <GoogleMap
            subscriptionKey={subscriptionKey}
            locations={locations}
            destination={destination}
            setDestination={setDestination}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;