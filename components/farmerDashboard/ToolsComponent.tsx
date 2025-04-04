"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { UserModel } from "@/models/User";

const ToolsComponent = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  //@ts-expect-error - Unreachable code error
  const { user } = userContext;
  const Tools = [
    {
      title: "AI Crop Recommendation",
      description: "Leverage AI to get personalized crop recommendations for maximum yield.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
      link: "/ai-crop-recommendation",
    },
    {
      title: "AI Soil Sampling Guide",
      description: "Learn the AI-recommended best practices for soil sampling.",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
      link: "/ai-soil-sampling-guide",
    },
    {
      title: "AI Soil Sample Registration",
      description: "Submit your soil sample for AI-driven analysis and insights.",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80",
      link: "/ai-soil-sample-registration",
    },
  ];
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
          {Tools.map(({ title, description, link, image }, index) => (
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
      </div>
    </div>
  );
};

export default ToolsComponent;
