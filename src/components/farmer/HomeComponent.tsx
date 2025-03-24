"use client";

import { Globe } from "lucide-react";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import { UserModel } from "@/models/User";

const HomeComponent = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  interface Result {
    updatedAt: ReactNode;
    samples: any;
  }

  const [recentResults, setRecentResults] = useState<Result[]>([]);

  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const { user, getUserData, getRecentResults } = userContext;

  useEffect(() => {
    if (!user) {
      getUserData();
    } else if ((user as UserModel).id) {
      const getRes = async () => {
        const res = await getRecentResults((user as UserModel).id);
        setRecentResults(res);
      };
      getRes();
    }
  }, [user]);

  const mainFeatures = [
    {
      title: "Soil Testing",
      description: "Get your soil analyzed by experts",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
      action: () => router.push("/soil-testing"),
    },
    {
      title: "How to Take Soil Sample",
      description: "Learn the correct way to collect soil",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
      action: () => router.push("/how-to"),
    },
    {
      title: "Register Your Sample",
      description: "Submit your soil sample for testing",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80",
      action: () => router.push("/register-soil-sample"),
    },
  ];

  function formatReadableDate(isoString: string | number | Date) {
    const date = new Date(isoString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
  
    return date.toLocaleString(undefined, options);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mainFeatures.map((feature, index) => (
            <button
              key={index}
              onClick={feature.action}
              className="relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02] group"
            >
              <div className="aspect-[4/3] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 text-sm">{feature.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Results */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recent Soil Test Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentResults.length > 0 &&
              recentResults.map((yard, yardIndex) =>
                yard.samples.map(
                  (
                    sample: {
                      sampleId: ReactNode;
                      sampleName:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                    },
                    sampleIndex: any
                  ) => (
                    <div
                      key={`${yardIndex}-${sampleIndex}`}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-green-600 mb-1">
                            {sample.sampleName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">
                            Sample ID: {sample.sampleId}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {yard.updatedAt && formatReadableDate(yard.updatedAt as string | number | Date)}
                          </p>
                        </div>
                        < button
                          onClick={() => {
                            router.push(`/results/${sample.sampleId}`);
                          }}
                          className="mt-4 w-full bg-green-600 text-white rounded-full py-2 px-4 hover:bg-green-700 transition-colors"
                        >
                          View Results
                        </button>
                      </div>
                    </div>
                  )
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
