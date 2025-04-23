"use client";
import Sidebar from "@/components/common/Sidebar";
import React, { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  step_1_sampling,
  step_2_sampling,
  step_3_sampling
} from "@/config/ImagesUrl";

const VideoComponent = React.lazy(
  () => import("@/components/common/VideoComponent")
);

const Page = () => {
  const router = useRouter();

  return (
    <main className="lg:flex h-screen lg:overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="w-full overflow-auto">
        <div className="flex justify-between text-xl lg:text-2xl px-3 py-2 border-b-2 border-b-gray-400">
          <button onClick={() => router.back()}>
            {" "}
            <Image 
              src="/assets/icons/back-arrow.svg" 
              width={16} 
              height={16} 
              alt="back" 
            />
          </button>
          How to take Soil Sample
          <button>
            <Image 
              src="/assets/icons/globe.svg" 
              width={30} 
              height={30} 
              alt="globe" 
            />
          </button>
        </div>
        <div className="w-fit mx-auto mt-3 rounded-lg border overflow-hidden">
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoComponent
              src={
                "https://res.cloudinary.com/diwmwhu0x/video/upload/v1743951644/Video_3_-_Soil_Sample_Processing_Hindi_jhznac.mp4"
              }
            />
          </Suspense>
        </div>
        <div className="mb-20">
          <h2 className="text-center text-xl mt-4">STEPS</h2>
          <div className="grid grid-cols-1 md:grid-cols-8 mx-5 md:mx-10 mt-5">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-center border-2 w-fit mx-auto px-2 rounded-md border-black hidden md:block ">
                1
              </h3>
              <div className=" md:w-[200px] md:mx-auto flex md:block">
                <Image
                  className="rounded-lg mx-auto mt-3"
                  src={step_1_sampling}
                  width={200}
                  height={200}
                  alt="globe"
                />
                <p className="text-xs sm:text-sm mt-3 ml-3 md:ml-auto">
                  Make a &apos;V&apos; shaped cut to a depth of 15 cm in the sampling spot
                </p>
              </div>
            </div>
            <div className="hidden md:block col-span-1 content-center">
              <Image
                className="mx-auto"
                src="/assets/icons/arrow.svg"
                width={100}
                height={30}
                alt="arrow"
              />
            </div>
            <div className="col-span-2">
              <h3 className="text-center border-2 w-fit mx-auto px-2 rounded-md border-black hidden md:block ">
                2
              </h3>
              <div className="sm:mx-10 md:w-[200px] md:mx-auto flex md:block">
                <Image
                  className="rounded-lg mx-auto mt-3"
                  src={step_2_sampling}
                  width={200}
                  height={200}
                  alt="globe"
                />
                <p className="text-xs sm:text-sm mt-3 ml-3 md:ml-auto">
                  Remove foreign materials like roots, stones, pebbles and
                  gravels from the soil sample
                </p>
              </div>
            </div>
            <div className="hidden md:block col-span-1 content-center">
              <Image
                className="mx-auto"
                src="/assets/icons/arrow.svg"
                width={100}
                height={30}
                alt="arrow"
              />
            </div>
            <div className="col-span-2">
              <h3 className="text-center border-2 w-fit mx-auto px-2 rounded-md border-black hidden md:block ">
                3
              </h3>
              <div className="sm:mx-10 md:w-[200px] md:mx-auto flex md:block">
                <Image
                  className="rounded-lg mx-auto mt-3"
                  src={step_3_sampling}
                  width={200}
                  height={200}
                  alt="globe"
                />
                <p className="text-xs sm:text-sm mt-3 ml-3 md:ml-auto">
                  Collect the sample in a clean cloth or polythene bag. Label
                  with required information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;