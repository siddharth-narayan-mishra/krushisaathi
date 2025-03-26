"use client";
import {
  AlertTriangle,
  Beaker,
  Check,
  Leaf,
  ThermometerSun
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import React from "react";

const TestComponent = () => {
  // Sample data - In a real app, this would come from your API
  const nutrientLevels = [
    { name: "Nitrogen (N)", value: 45, recommended: 50, unit: "kg/ha" },
    { name: "Phosphorus (P)", value: 30, recommended: 25, unit: "kg/ha" },
    { name: "Potassium (K)", value: 35, recommended: 40, unit: "kg/ha" },
    { name: "Sulfur (S)", value: 15, recommended: 20, unit: "kg/ha" },
    { name: "Zinc (Zn)", value: 3, recommended: 3, unit: "ppm" }
  ];

  const phHistory = [
    { month: "Jan", ph: 6.5 },
    { month: "Feb", ph: 6.7 },
    { month: "Mar", ph: 6.4 },
    { month: "Apr", ph: 6.8 },
    { month: "May", ph: 6.6 },
    { month: "Jun", ph: 6.9 }
  ];

  const organicMatter = [
    { name: "Organic Matter", value: 65 },
    { name: "Other Components", value: 35 }
  ];

  const COLORS = ["#22C55E", "#E5E7EB"];

  const recommendations = [
    {
      title: "Nitrogen Application",
      status: "warning",
      message:
        "Consider adding 5 kg/ha of nitrogen fertilizer for optimal growth",
      icon: AlertTriangle
    },
    {
      title: "Phosphorus Levels",
      status: "success",
      message: "Phosphorus levels are within optimal range",
      icon: Check
    },
    {
      title: "Organic Matter",
      status: "success",
      message: "Good organic matter content. Continue current practices",
      icon: Leaf
    },
    {
      title: "Soil pH",
      status: "warning",
      message: "pH is slightly low. Consider adding lime to raise pH",
      icon: ThermometerSun
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center space-x-3 mb-6">
              <Beaker className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Soil Analysis Report
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Nutrient Levels Chart */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Nutrient Levels
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={nutrientLevels}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name="Current Level"
                        fill="#22C55E"
                      />
                      <Bar
                        dataKey="recommended"
                        name="Recommended"
                        fill="#94A3B8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* pH Level History */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  pH Level History
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={phHistory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[5, 8]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ph"
                        stroke="#22C55E"
                        name="pH Level"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Organic Matter Chart */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Organic Matter Content
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={organicMatter}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {organicMatter.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                    >
                      <div className="flex items-start space-x-3">
                        <rec.icon
                          className={`w-5 h-5 mt-0.5 ${
                            rec.status === "warning"
                              ? "text-amber-500"
                              : "text-green-600"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {rec.title}
                          </h3>
                          <p className="text-sm text-gray-600">{rec.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analysis Table */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Detailed Analysis
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parameter
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommended Range
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {nutrientLevels.map((nutrient, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {nutrient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {nutrient.value} {nutrient.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {nutrient.recommended * 0.8} -{" "}
                          {nutrient.recommended * 1.2} {nutrient.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              Math.abs(nutrient.value - nutrient.recommended) <=
                              nutrient.recommended * 0.2
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {Math.abs(nutrient.value - nutrient.recommended) <=
                            nutrient.recommended * 0.2
                              ? "Optimal"
                              : "Needs Attention"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestComponent;
