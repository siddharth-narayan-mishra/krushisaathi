"use client";

import {
  AlertTriangle,
  Beaker,
  Leaf,
  ThermometerSun,
  FileText,
  Download,
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
} from "recharts";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useContext, Suspense } from "react";
import YardContext from "@/context/YardContext";

const ViewReportPageContent = () => {
  const searchParams = useSearchParams();
  const sampleId = searchParams.get("sampleId");
  const yardId = searchParams.get("yardId");

  interface SampleData {
    nutrients: {
      macroNutrients: Record<string, string | number>;
      secondaryNutrients: Record<string, string | number>;
      microNutrients: Record<string, string | number>;
      physicalParameters: Record<string, string | number>;
    };
    pdfUrl?: string;
    suggestions?: string;
  }

  const [sampleData, setSampleData] = useState<SampleData | null>(null);
  const [loading, setLoading] = useState(true);
  const yardContext = useContext(YardContext);

  if (!yardContext || !yardContext.getYard) {
    throw new Error("YardContext is not properly initialized.");
  }

  const { getYard } = yardContext;

  useEffect(() => {
    const fetchSampleData = async () => {
      if (!sampleId || !yardId) {
        console.error("Missing sampleId or yardId in query parameters.");
        setLoading(false);
        return;
      }

      try {
        const yardData = await getYard(yardId);
        if (!yardData) {
          throw new Error("Failed to fetch yard data.");
        }

        const sample = yardData.samples.find(
          (sample: { sampleId: string }) => sample.sampleId === sampleId
        );

        if (!sample) {
          console.error("Sample not found in yard.");
        }

        setSampleData(sample || null);
      } catch (error) {
        console.error("Error fetching sample data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSampleData();
  }, [sampleId, yardId, getYard]);

  // Nutrient Optimal Ranges
  const getNutrientStatus = (name: string, value: number): string => {
    const optimalRanges: Record<
      string,
      { min: number; max: number; unit?: string }
    > = {
      // Macronutrients (kg/ha)
      "Nitrogen (N)": { min: 40, max: 60, unit: "kg/ha" },
      "Phosphorus (P)": { min: 20, max: 40, unit: "kg/ha" },
      "Potassium (K)": { min: 40, max: 80, unit: "kg/ha" },

      // Secondary Nutrients (kg/ha)
      "Calcium (Ca)": { min: 1000, max: 2000, unit: "kg/ha" },
      "Magnesium (Mg)": { min: 50, max: 100, unit: "kg/ha" },
      "Sulfur (S)": { min: 10, max: 30, unit: "kg/ha" },

      // Micronutrients (ppm)
      "Iron (Fe)": { min: 4.5, max: 9, unit: "ppm" },
      "Manganese (Mn)": { min: 2, max: 5, unit: "ppm" },
      "Zinc (Zn)": { min: 1, max: 3, unit: "ppm" },
      "Copper (Cu)": { min: 0.5, max: 1.5, unit: "ppm" },
      "Boron (B)": { min: 0.5, max: 2.5, unit: "ppm" },

      // Physical Parameters
      pH: { min: 6.0, max: 7.5 },
      "Organic Content (OC)": { min: 3, max: 5, unit: "%" },
    };

    const range = optimalRanges[name];
    if (!range) return "Unknown";

    if (name === "pH") {
      if (value < 5.5) return "Very Acidic";
      if (value < range.min) return "Acidic";
      if (value > 8.5) return "Very Alkaline";
      if (value > range.max) return "Alkaline";
      return "Optimal";
    }

    if (value >= range.min && value <= range.max) return "Optimal";
    if (value < range.min) return "Low";
    return "High";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Beaker className="mx-auto w-12 h-12 text-green-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!sampleData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="mx-auto w-12 h-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Sample Not Found
          </h1>
          <p className="text-gray-600">
            The requested sample could not be located.
          </p>
        </div>
      </div>
    );
  }

  // Transform nutrients data for charts
  const nutrientLevels = [
    ...Object.entries(sampleData.nutrients.macroNutrients).map(
      ([name, value]) => ({
        name,
        value: parseFloat(value as string),
        recommended: 50,
        unit: "kg/ha",
      })
    ),
    ...Object.entries(sampleData.nutrients.secondaryNutrients).map(
      ([name, value]) => ({
        name,
        value: parseFloat(value as string),
        recommended: 20,
        unit: "kg/ha",
      })
    ),
    ...Object.entries(sampleData.nutrients.microNutrients).map(
      ([name, value]) => ({
        name,
        value: parseFloat(value as string),
        recommended: 3,
        unit: "ppm",
      })
    ),
  ];

  const physicalParameters = Object.entries(
    sampleData.nutrients.physicalParameters
  ).map(([name, value]) => ({ name, value: parseFloat(value as string) }));

  const recommendations = [
    {
      title: "Soil pH",
      status:
        (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) < 6.5
          ? "warning"
          : (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) > 7.5
          ? "warning"
          : "success",
      message:
        (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) < 6.5
          ? "pH is slightly low. Consider adding lime to raise the pH."
          : (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) > 7.5
          ? "pH is slightly high. Consider adding sulfur or organic matter to lower the pH."
          : "Soil pH is within the optimal range.",
      icon:
        (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) < 6.5 ||
        (physicalParameters.find((p) => p.name === "pH")?.value ?? 0) > 7.5
          ? AlertTriangle
          : ThermometerSun,
    },
    {
      title: "Organic Content",
      status:
        (physicalParameters.find((p) => p.name === "Organic Content (OC)")
          ?.value || 0) > 5
          ? "success"
          : "warning",
      message:
        (physicalParameters.find((p) => p.name === "Organic Content (OC)")
          ?.value || 0) > 5
          ? "Good organic matter content"
          : "Low organic matter. Consider adding organic amendments",
      icon: Leaf,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Soil Analysis Report
            </h1>
          </div>
          {sampleData.pdfUrl && (
            <a
              href={sampleData.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download className="w-5 h-5" />
              <span>Download Full Report</span>
            </a>
          )}
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
                  <Bar dataKey="value" name="Current Level" fill="#22C55E" />
                  <Bar
                    dataKey="recommended"
                    name="Recommended"
                    fill="#94A3B8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Physical Parameters Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Physical Parameters
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={physicalParameters}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      <h3 className="font-medium text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Lab Suggestions
            </h2>
            <p className="text-gray-600">
              {sampleData.suggestions || "No specific suggestions provided."}
            </p>
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ...Object.entries(sampleData.nutrients.macroNutrients),
                  ...Object.entries(sampleData.nutrients.secondaryNutrients),
                  ...Object.entries(sampleData.nutrients.microNutrients),
                  ...Object.entries(sampleData.nutrients.physicalParameters),
                ].map(([name, value], index) => {
                  const status = getNutrientStatus(
                    name,
                    parseFloat(value as string)
                  );

                  // Determine status color and type
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case "Optimal":
                        return "bg-green-100 text-green-800";
                      case "Low":
                      case "Acidic":
                      case "Very Acidic":
                        return "bg-blue-100 text-blue-800";
                      case "High":
                      case "Alkaline":
                      case "Very Alkaline":
                        return "bg-red-100 text-red-800";
                      default:
                        return "bg-gray-100 text-gray-800";
                    }
                  };

                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {String(value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewReportPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <ViewReportPageContent />
    </Suspense>
  );
};

export default ViewReportPage;
