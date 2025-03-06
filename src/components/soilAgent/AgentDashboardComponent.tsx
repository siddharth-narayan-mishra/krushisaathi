import React from "react";
import { Users, ClipboardList, TestTube2, CheckCircle } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl shadow-lg p-6 w-full md:w-[280px] bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary_green">
          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    </div>
  );
}

function AgentDashboardComponent() {
  const stats = [
    {
      title: "Total Farmers",
      value: 234,
      icon: Users
    },
    {
      title: "Pending Requests",
      value: 234,
      icon: ClipboardList
    },
    {
      title: "Sample Processing",
      value: 234,
      icon: TestTube2
    },
    {
      title: "Completed Tests",
      value: 234,
      icon: CheckCircle
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold">
            Welcome to Krushisaathi Soil Agent Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage your soil testing operations
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AgentDashboardComponent;
