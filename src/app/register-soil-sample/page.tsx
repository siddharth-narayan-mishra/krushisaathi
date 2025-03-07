"use client";
import React, { useState, useContext, useEffect } from "react";
import GoogleMap from "../../components/farmer/GoogleMap";
import Sidebar from "@/components/farmer/Sidebar";
import backArrow from "../../../public/assets/icons/back-arrow.svg";
import Image from "next/image";
import navigationContext from "@/context/navigationContext";
import Directions from "../../../public/assets/icons/Directions.svg";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import { placeholder_lab } from "@/config/ImagesUrl";
import LabContext from "@/context/labContext";

const Page = () => {
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const router = useRouter();
  const subscriptionKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  if (!subscriptionKey) {
    console.error("Google Maps subscription key is not defined in .env.local");
    return <div>Error: Google Maps subscription key is not defined.</div>;
  }

  const navContext = useContext(navigationContext);

  if (!navContext) {
    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }
  const { setActive, prevActive } = navContext;

  const [locations, setLocations] = useState<any[]>([]);

  const userContext = useContext(UserContext);

  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const handleProceedClick = (id: string) => {
    const url = "/register-soil-sample/" + id;
    console.log("Navigating to:", url);

    router.push(url);
  };

  const getDirections = (position: { latitude: number; longitude: number }) => {
    console.log("Getting directions to:", position);

    if (position && position.latitude && position.longitude) {
      setDestination(position);
      console.log("Getting directions to:", position);
    } else {
      console.error("Invalid position data:", position);
    }
  };

  const labContext = useContext(LabContext);
  if (!labContext) {
    console.error("Lab context is not provided");
    return <div>Error: Lab context is not provided.</div>;
  }

  const { getLabs } = labContext;

  useEffect(() => {
    getLabs().then((data) => {
      if (data) {
        setLocations(data);
      }
    });
  }, []);

  return (
    <>
      <div className="block relative lg:flex h-screen overflow-hidden">
        <div className="w-full lg:w-fit">
          <Sidebar />
        </div>
        <div className="absolute lg:relative z-10 bg-white w-full lg:w-96 bottom-0 h-[400px] lg:h-auto rounded-t-xl lg:rounded-none">
          <div className="flex w-full lg:w-96 text-2xl px-3 py-2 border-b-2 border-b-gray-400">
            <button onClick={() => router.back()}>
              {" "}
              <Image src={backArrow} width={13} height={13} alt="back" />
            </button>
            <span className="w-full text-center">Choose Location</span>
          </div>
          <div className="overflow-auto h-full pb-10 lg:pb-0 ">
            {locations.length > 0 &&
              locations.map((location) => (
                <div key={location.id}>
                  <div className="w-80 mx-auto mt-5">
                    <Image
                      src={placeholder_lab}
                      height={300}
                      width={300}
                      alt={"lab"}
                      className="mx-auto"
                      priority
                    />
                    <h2 className="mt-3 text-sm">
                      {location.name}, {location.address.district}
                    </h2>
                    <p className="text-xs mt-2">
                      Address: {location.address.fulladdress}
                    </p>
                    <p className="text-xs mt-2">Phone: {location.phone}</p>

                    <div className="flex justify-around my-5">
                      <button
                        className="location_utility_button"
                        onClick={() => getDirections(location.position)}
                      >
                        <Image
                          src={Directions}
                          width={20}
                          height={20}
                          alt="Directions"
                          className="mr-1 "
                        />
                        Directions
                      </button>

                      <button
                        onClick={() => {
                          handleProceedClick(location.id);
                        }}
                        className="bg-primary_green w-fit text-white text-sm font-light rounded-full px-4 py-0.5 flex mx-auto"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full h-full">
          <GoogleMap
            subscriptionKey={subscriptionKey}
            locations={locations}
            destination={destination}
            setDestination={setDestination}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
