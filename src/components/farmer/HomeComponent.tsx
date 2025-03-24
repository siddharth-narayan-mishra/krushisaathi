"use client";

import { Globe } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import { UserModel } from "@/models/User";
import { Yard } from "@/models/Yard";

const HomeComponent = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [inProgressYards, setInProgressYards] = useState<Yard[]>([]);
  const [completedYards, setCompletedYards] = useState<Yard[]>([]);

  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const { user, getUserData, getYards, yards } = userContext;

  useEffect(() => {
    if (!user) {
      getUserData();
    } else if ((user as UserModel).id) {
      (async () => {
        if (yards.length === 0) {
          const res = await getYards((user as UserModel).id);
          const inProgress: Yard[] = res.filter((yard: { samples: any[] }) =>
            yard.samples.some((sample) => sample.status !== "completed")
          );
          const completed: Yard[] = res.filter((yard: { samples: any[] }) =>
            yard.samples.every((sample) => sample.status === "completed")
          );
          setInProgressYards(inProgress);
          setCompletedYards(completed);
        }
      })();
    }
  }, [user]);

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

  const YardCard = ({ yard, type }: { yard: Yard; type: string }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-green-600 mb-1">
            {yard.yardName}
          </h3>
          <p className="text-gray-600 text-sm mb-1">Yard ID: {yard.yardId}</p>
          <p className="text-gray-500 text-sm">
            {yard.updatedAt && formatReadableDate(yard.updatedAt)}
          </p>
        </div>
        <button
          onClick={() => router.push(`/${type}/${yard.yardId}`)}
          className="mt-4 w-full bg-green-600 text-white rounded-full py-2 px-4 hover:bg-green-700 transition-colors"
        >
          {type === "results" ? "View Results" : "View Progress"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {user && !(user as any).props
                ? `नमस्ते, ${(user as UserModel).name}`
                : "Loading..."}
            </h1>
            <p className="text-gray-600 mt-1">Welcome to Krushisaathi</p>
          </div>
          <Globe className="w-8 h-8 text-green-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mainFeatures.map(({ title, description, image, link }, index) => (
            <button
              key={index}
              onClick={() => router.push(link)}
              className="relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02] group"
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

        {[
          { title: "Completed Tests", data: completedYards, type: "results" },
          {
            title: "In Progress Soil Tests",
            data: inProgressYards,
            type: "test-progress",
          },
        ].map(({ title, data, type }) => (
          <div key={title}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.length > 0 &&
                data.map((yard) => (
                  <YardCard key={yard.yardId} yard={yard} type={type} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
