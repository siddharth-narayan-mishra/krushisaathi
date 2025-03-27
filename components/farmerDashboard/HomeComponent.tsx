"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { UserModel } from "@/models/User";
import { Yard } from "@/models/Yard";
import YardContext from "@/context/YardContext";

const HomeComponent = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const yardContext = useContext(YardContext);
  const [inProgressYards, setInProgressYards] = useState<Yard[]>([]);
  const [completedyards, setCompletedYards] = useState<Yard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //@ts-expect-error - Unreachable code error
  const { user, getUserData } = userContext;

  //@ts-expect-error - Unreachable code error
  const { getYards } = yardContext;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        if (!user) {
          getUserData();
        } else {
          const res = await getYards(
            (user as UserModel).id,
            (user as UserModel).role
          );
          const inProgress: Yard[] = res.filter(
            (yard: { samples: { status: string }[] }) =>
              yard.samples.some((sample) => sample.status !== "completed")
          );
          const Completed: Yard[] = res.filter(
            (yard: { samples: { status: string }[] }) =>
              yard.samples.some((sample) => sample.status === "completed")
          );
          setInProgressYards(inProgress);
          setCompletedYards(Completed);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, getUserData, getYards]);

  const mainFeatures = [
    {
      title: "Soil Testing",
      description: "Get your soil analyzed by experts",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
      link: "/soil-testing",
    },
    {
      title: "How to Take Soil Sample",
      description: "Learn the correct way to collect soil",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
      link: "/how-to",
    },
    {
      title: "Register Your Sample",
      description: "Submit your soil sample for testing",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80",
      link: "/register-soil-sample",
    },
  ];

  const formatReadableDate = (isoString: string | number | Date) =>
    new Date(isoString).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const SkeletonYardCard = () => (
    <div className="bg-white font-roboto rounded-2xl border border-green-100 shadow-md animate-pulse">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded-full w-1/2 mb-2" />
            </div>
            <div className="h-6 bg-gray-100 rounded-full px-3 py-1 w-20" />
          </div>
          <div className="h-4 bg-gray-100 rounded-full w-2/3" />
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full py-3 px-4" />
      </div>
    </div>
  );

  const YardCard = ({ yard, type }: { yard: Yard; type: string }) => (
    <div className="bg-white rounded-xl border border-primary_green/[0.2] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary_green mb-1 tracking-tight">
              {yard.yardName}
            </h3>
            <p className="text-primary_black text-sm">ID: {yard.yardId}</p>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center text-f mt-3">
            <CalendarDays size={15} className="mr-2 text-primary_black/[0.5]" />
            <p className="text-sm">
              {yard.updatedAt
                ? formatReadableDate(yard.updatedAt)
                : "No updates yet"}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push(`/${type}/${yard.yardId}`)}
          className="mt-4 w-full bg-primary_green text-white rounded-lg py-2.5 px-4 hover:bg-farm-green-600 transition-colors duration-300 flex items-center justify-center font-medium text-sm"
          aria-label={`View progress for ${yard.yardName}`}
        >
          <span>View Progress</span>
          <ArrowRight
            size={16}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-roboto bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {user && !user.props
                ? `नमस्ते, ${(user as UserModel).name}`
                : "Welcome"}
            </h1>
            <p className="text-gray-600 mt-1">Your Krushisaathi Dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mainFeatures.map(({ title, description, link, image }, index) => (
            <button
              key={index}
              onClick={() => router.push(link)}
              className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="aspect-[4/3] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-white/90 text-sm">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-7">
          {[
            { title: "Your completed Soil Tests", yards: completedyards },
            { title: "Your Ongoing Soil Tests", yards: inProgressYards },
          ].map(({ title, yards }, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {title}
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <SkeletonYardCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yards.map((yard) => (
                    <YardCard
                      key={yard.yardId}
                      yard={yard}
                      type="test-progress"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {inProgressYards.length === 0 && isLoading && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No Active Soil Tests
            </h3>
            <p className="text-gray-600 mb-6">
              Ready to start testing your soil? Click on &apos;Register Your
              Sample&apos; to begin.
            </p>
            <button
              onClick={() => router.push("/register-soil-sample")}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              Register Soil Sample
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
