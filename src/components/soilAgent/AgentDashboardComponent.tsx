import React, { useEffect, useState, useContext } from "react";
import { CheckCircle, Users2, XCircle, Clock } from "lucide-react";
import { YardModel } from "@/models/Yard";
import { getLabId, UseUser } from "@/utils/getData";
import YardContext from "@/context/yardContext";
import { StatCard } from "@/utils/ststs-card";

const AgentDashboardComponent = () => {
  const [yardData, setYardData] = useState<YardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LabData = UseUser();
  const yardContext = useContext(YardContext);

  const labId = getLabId(LabData);
  console.log("labId:", labId);

  useEffect(() => {
    const fetchData = async () => {
      if (!labId || !yardContext) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching yard data for labId:", labId);
        console.log("Using yardContext.getYard:", yardContext.getYard);

        const data = await yardContext.getYard(labId);
        console.log("Data received:", data);
        setYardData(data);
      } catch (err) {
        console.error("Error fetching yard data:", err);
        setError("Failed to fetch yard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [labId, yardContext]);

  if (loading)
    return <div className="p-8 text-center">Loading dashboard data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!yardData)
    return <div className="p-8 text-center">No yard data available</div>;

  const stats = [
    {
      title: "Total Samples",
      value: yardData.samples?.length || 0,
      icon: Users2,
      color: "bg-primary_green"
    },
    {
      title: "Pending Samples",
      value:
        yardData.samples?.filter((s) => s.status === "pending").length || 0,
      icon: Clock,
      color: "bg-primary_green"
    },
    {
      title: "Completed Samples",
      value:
        yardData.samples?.filter((s) => s.status === "complete").length || 0,
      icon: CheckCircle,
      color: "bg-primary_green"
    },
    {
      title: "Rejected Samples",
      value:
        yardData.samples?.filter((s) => s.status === "rejected").length || 0,
      icon: XCircle,
      color: "bg-primary_green"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold">
            Soil Testing Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Yard Name: {yardData.yardName} | Yard ID: {yardData.yardId}
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
