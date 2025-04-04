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
      title: "Crop Recommender",
      description: "Leverage AI to get personalized crop recommendations for maximum yield.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhX5I4ProfU3UPYtGyUuYBPklpN3f7nX5dZA&s",
      link: "https://krushisathirecom.streamlit.app/",
    },
    {
      title: "Farming Help",
      description: "Get expert advice on farming practices and techniques.",
      image:
        "https://development.asia/sites/default/files/summary/four-ways-smart-technology-help-farmers.jpg",
      link: "https://agriappai.streamlit.app/",
    },
    {
      title: "Crop Disease Predictor",
      description: "Identify and manage Crop Diseases effectively.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZiia7GTz4sceoKCoMDwEVu0Nfya_ZUHHnMw&s",
      link: "https://agriappai.streamlit.app/",
    },{
      title: "Smart Crop Price Advisor",
      description: "Utilize AI to get real-time crop price predictions and maximize your profits.",
      image:
        "https://www.taropumps.com/media/3350/taro-pumps-cash-crops-2.jpg",
      link: "https://krushiprice.streamlit.app/",
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
