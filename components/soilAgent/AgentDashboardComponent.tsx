import React, { useEffect, useState, useContext } from "react";
import { CheckCircle, Users2, Paperclip, Clock } from "lucide-react";
import { Yard } from "@/models/Yard";
import YardContext from "@/context/YardContext";

// import { StatCard } from "@/utils/ststs-card";
import UserContext from "@/context/UserContext";
import { LabModel } from "@/models/Labs";

// Charts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend
} from "recharts";

const AgentDashboardComponent = () => {
  const [yardsData, setYardsData] = useState<Yard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);
  const yardContext = useContext(YardContext);

  //@ts-expect-error - Unreachable code error
  const { user, getUserData } = userContext;

  //@ts-expect-error - Unreachable code error
  const { getYards } = yardContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!user) {
          getUserData();
        } else {
          const yards = await getYards(
            (user as LabModel).id,
            (user as LabModel).role
          );
          setYardsData(yards);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, getUserData, getYards]);

  const getTotalSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.length;
    });
    return total;
  };

  const getRegisteredSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.filter((s) => s.status === "registered").length;
    });
    return total;
  };

  const getInProgressSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.filter((s) => s.status === "in-process").length;
    });
    return total;
  };

  const getCompletedSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.filter((s) => s.status === "completed").length;
    });
    return total;
  };

  if (isLoading)
    return (
      <div className="p-6 sm:p-10 animate-pulse max-w-7xl mx-auto">
        <div className="mb-10 space-y-4">
          <div className="h-8 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 shadow-md border border-gray-200 bg-white"
            >
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-2/3 bg-gray-400 rounded mb-4"></div>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 border border-gray-200"
            >
              <div className="h-5 w-1/2 bg-gray-300 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6 border border-gray-200">
          <div className="h-5 w-1/4 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );

  if (!yardsData)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
          <div className="flex justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75L8.25 11.25m0 0L6.75 12.75M8.25 11.25l1.5 1.5m0-4.5a3 3 0 113.5 4.5m2.5-3l1.5 1.5m0 0L17.25 15m1.5-2.25l-1.5 1.5"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Yard Data Available
          </h2>
          <p className="text-gray-500 mb-4">
            We couldn&apos;t find any yard data associated with your lab at the
            moment.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block mt-2 px-4 py-2 bg-primary_green text-white font-medium rounded-full hover:bg-green-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  const stats = [
    {
      title: "Total Samples",
      value: getTotalSamples() || 0,
      icon: Users2,
      color: "bg-primary_green"
    },
    {
      title: "Registered Samples",
      value: getRegisteredSamples() || 0,
      icon: Paperclip,
      color: "bg-primary_green"
    },
    {
      title: "In Progress",
      value: getInProgressSamples() || 0,
      icon: Clock,
      color: "bg-primary_green"
    },
    {
      title: "Completed Samples",
      value: getCompletedSamples() || 0,
      icon: CheckCircle,
      color: "bg-primary_green"
    }
  ];

  const COLORS = ["#10B981", "#F59E0B", "#3B82F6"];

  const pieData = [
    { name: "Registered", value: getRegisteredSamples() },
    { name: "In Progress", value: getInProgressSamples() },
    { name: "Completed", value: getCompletedSamples() }
  ];

  const barData =
    yardsData?.map((yard) => ({
      name: yard.yardName || `Yard ${yard.id}`,
      samples: yard.samples.length
    })) || [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 overflow-auto">
      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl text-gray-900 font-extrabold tracking-tight">
            Soil Testing Dashboard
          </h1>
          <p className="mt-3 text-gray-600 text-lg flex items-center gap-2">
            <span className="font-semibold">Lab Name:</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {(user as LabModel).labName}
            </span>
            |<span className="font-semibold">Lab ID:</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {(user as LabModel).id}
            </span>
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-6 shadow-md border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-4 right-4">
                <stat.icon className="w-6 h-6 text-primary_green" />
              </div>
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                {stat.title}
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </h2>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 rounded-full bg-primary_green"
                    style={{
                      width: `${(stat.value / getTotalSamples()) * 100}%`
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  {((stat.value / getTotalSamples()) * 100).toFixed(1)}% of
                  total
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sample Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Samples per Yard
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="samples" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 bg-white rounded-xl shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
          <ul className="text-gray-600 space-y-2 text-sm list-disc list-inside">
            <li>
              You have{" "}
              <span className="font-semibold text-gray-900">
                {getTotalSamples()}
              </span>{" "}
              total samples across all yards.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                {getRegisteredSamples()}
              </span>{" "}
              are registered and{" "}
              <span className="font-semibold text-gray-900">
                {getInProgressSamples()}
              </span>{" "}
              are currently in process.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                {getCompletedSamples()}
              </span>{" "}
              samples have been completed successfully.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AgentDashboardComponent;
