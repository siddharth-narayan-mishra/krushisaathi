"use client";

import React, { useState, useContext, useEffect } from "react";
import { ArrowLeft, MapPin, Navigation2, Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleMap from "@/components/soilTestingRegistration/GoogleMap";
import LabContext from "@/context/LabContext";

const Page = () => {
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locations, setLocations] = useState<{ id: string; labName: string; address: { district: string }; phone: string; position: { latitude: number; longitude: number } }[]>([]);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const router = useRouter();
  const subscriptionKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const labContext = useContext(LabContext);

  //@ts-expect-error - Unreachable code error
  const { getLabs } = labContext;

  useEffect(() => {
    if (!getLabs) return;
    getLabs().then((data: React.SetStateAction<{ id: string; labName: string; address: { district: string }; phone: string; position: { latitude: number; longitude: number } }[]>) => {
      if (data) {
        setLocations(data);
      }
    });
  }, [getLabs]);

  // Close sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProceedClick = (id: string) => {
    router.push(`/register-soil-sample/${id}`);
  };

  const getDirections = (position: { latitude: number; longitude: number }) => {
    if (position && position.latitude && position.longitude) {
      setDestination(position);
      // Close sidebar when directions button is clicked (on mobile)
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">


      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 absolute md:relative z-20 md:z-auto w-full md:w-[400px] h-[calc(100%-60px)] md:h-full bg-white border-r border-gray-200 flex flex-col`}
      >
        {/* Sidebar header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Testing Centers
            </h1>
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {locations.map((lab) => (
            <div
              key={lab.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedLab === lab.id ? "bg-green-50" : ""
              }`}
              onClick={() => {
                setSelectedLab(lab.id);
                // No longer closing sidebar when lab is selected
              }}
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
                        // Sidebar closes in getDirections function when directions button is clicked
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

      {/* Map Panel - Takes full height on mobile when sidebar is closed */}
      <div className="flex-1 relative">
        {/* Floating button to reopen sidebar on mobile */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="md:hidden absolute top-4 left-4 z-10 p-3 bg-white rounded-full shadow-md"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <GoogleMap
          subscriptionKey={subscriptionKey}
          locations={locations}
          destination={destination}
          setDestination={setDestination}
        />
      </div>
    </div>
  );
};

export default Page;