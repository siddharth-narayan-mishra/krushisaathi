import React, { useEffect, useState, useContext } from "react";
import { CheckCircle, Users2, XCircle, Clock } from "lucide-react";
import { Yard } from "@/models/Yard";
import YardContext from "@/context/YardContext";

import { StatCard } from "@/utils/ststs-card";
import UserContext from "@/context/UserContext";
import { LabModel } from "@/models/Labs";

const AgentDashboardComponent = () => {
  const [yardsData, setYardsData] = useState<Yard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);
  const yardContext = useContext(YardContext);

  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const { user, getUserData } = userContext;

  if (!yardContext) {
    console.error("Yard context is not provided");
    return <div>Error: Yard context is not provided.</div>;
  }

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
  }, [user]);

  const getTotalSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.length;
    });
    return total;
  };

  const getPendingSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.filter((s) => s.status === "pending").length;
    });
    return total;
  };
  const getInProgressSamples = () => {
    let total = 0;
    yardsData?.forEach((yard) => {
      total += yard.samples.filter((s) => s.status === "in-progress").length;
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
    return <div className="p-8 text-center">Loading dashboard data...</div>;
  if (!yardsData)
    return <div className="p-8 text-center">No yard data available</div>;

  const stats = [
    {
      title: "Total Samples",
      value: getTotalSamples() || 0,
      icon: Users2,
      color: "bg-primary_green",
    },
    {
      title: "Pending Samples",
      value: getPendingSamples() || 0,
      icon: Clock,
      color: "bg-primary_green",
    },
    {
      title: "In Progress",
      value: getInProgressSamples() || 0,
      icon: XCircle,
      color: "bg-primary_green",
    },
    {
      title: "Completed Samples",
      value: getCompletedSamples() || 0,
      icon: CheckCircle,
      color: "bg-primary_green",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold">
            Soil Testing Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Lab Name: {(user as LabModel).labName} | Lab ID:{" "}
            {(user as LabModel).id}
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
export default AgentDashboardComponent;
