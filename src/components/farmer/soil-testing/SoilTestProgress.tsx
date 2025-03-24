"use client";
import UserContext from "@/context/userContext";
import { Yard } from "@/models/Yard";
import {
  ChevronRight,
  Check,
  Clock,
  Leaf,
  Calendar,
  MapPin,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SoilTestProgressProps {
  yardId: string;
}

const SoilTestProgress: React.FC<SoilTestProgressProps> = ({ yardId }) => {
  // const progressPercent = 75;

  const userContext = useContext(UserContext);
  if (!userContext) {
    console.error("User context is not provided");
    return <div>Error: User context is not provided.</div>;
  }

  const { user, yards } = userContext;

  const [yard, setYard] = useState<Yard | undefined>();
  const [activeSample, setActiveSample] = useState(1);

  useEffect(() => {
    if (!yards.length || !yardId) return;
    const givenYard = yards.find((yard) => yard.yardId === yardId);
    console.log("yard", givenYard);
    setYard(givenYard);
    if (!givenYard) toast.error("Yard not found");
  }, []);

  const getProgress = () => {
    const totalSamples = yard?.samples.length || 1;
    const completedSamples = yard?.samples.filter(
      (sample) => sample.status === "completed"
    ).length;
    return completedSamples ? (completedSamples / totalSamples) * 100 : 0;
  };

  const getSampleProgress = () => {
    const status = yard?.samples[activeSample - 1].status;
    if (status === "registered") return 1;
    else if (status === "sampleReceived") return 2;
    else if (status === "labProcessing") return 3;
    else if (status === "completed") return 4;
    return 0;
  };

  const handleNextSample = () => {
    if (yard && activeSample < yard.samples.length) {
      setActiveSample(activeSample + 1);
    } else {
      setActiveSample(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-3">
            <Leaf size={14} className="opacity-80" />
            <span>Soil Health Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Your Soil Testing Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Monitor your soil analysis progress and access comprehensive test
            results to optimize your crop yield
          </p>
        </div>

        {/* In Progress Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              In Progress Tests
            </h2>
            <div className="relative w-[220px]">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={yard?.yardName}
                onChange={(e) => {
                  const newYard = yards.find(
                    (yard) => yard.yardId === e.target.value
                  );
                  setYard(newYard);
                  setActiveSample(1);
                }}
              >
                <option value="" disabled>
                  Select a yard
                </option>
                {yards.map((yard) => (
                  <option key={yard.yardId} value={yard.yardId}>
                    {yard.yardName} ({yard.samples.length} samples)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm text-gray-500 font-medium">
                    Sample {activeSample} of {yard?.samples.length}
                  </span>
                  <span className="h-4 w-0.5 bg-gray-200 rounded-full"></span>
                  <span className="text-xl font-bold text-gray-900">
                    {yard?.yardName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-500">
                    {yard?.samples[activeSample - 1].sampleName}
                  </h3>
                  <div className="py-1 px-2.5 rounded-md bg-gray-100 text-gray-700 text-xs font-mono">
                    {yard?.samples[activeSample - 1].sampleId}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress steps */}
            <div className="mb-8 relative">
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full -z-10"></div>

              <div className="flex justify-between">
                <div className="w-1/4 flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 mb-2 rounded-full ${
                      getSampleProgress() >= 1 ? "bg-green-600" : "bg-gray-200"
                    } text-white flex items-center justify-center`}
                  >
                    {getSampleProgress() >= 1 ? (
                      <Check size={18} />
                    ) : (
                      <span className="text-sm font-semibold">1</span>
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      getSampleProgress() >= 1
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    Registered
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {getSampleProgress() >= 1 ? "completed" : "Pending"}
                  </div>
                </div>

                <div className="w-1/4 flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 mb-2 rounded-full ${
                      getSampleProgress() >= 2 ? "bg-green-600" : "bg-gray-200"
                    } text-white flex items-center justify-center`}
                  >
                    {getSampleProgress() >= 2 ? (
                      <Check size={18} />
                    ) : (
                      <span className="text-sm font-semibold">2</span>
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      getSampleProgress() >= 2
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    Sample Received
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {getSampleProgress() >= 1 ? "completed" : "Pending"}
                  </div>
                </div>

                <div className="w-1/4 flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 mb-2 rounded-full ${
                      getSampleProgress() >= 3 ? "bg-green-600" : "bg-gray-200"
                    } text-white flex items-center justify-center`}
                  >
                    {getSampleProgress() >= 3 ? (
                      <Check size={18} />
                    ) : (
                      <span className="text-sm font-semibold">3</span>
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      getSampleProgress() >= 3
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    Lab Processing
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {getSampleProgress() >= 1 ? "completed" : "Pending"}
                  </div>
                </div>

                <div className="w-1/4 flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 mb-2 rounded-full ${
                      getSampleProgress() >= 4 ? "bg-green-600" : "bg-gray-200"
                    } text-white flex items-center justify-center`}
                  >
                    {getSampleProgress() >= 4 ? (
                      <Check size={18} />
                    ) : (
                      <span className="text-sm font-semibold">4</span>
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      getSampleProgress() >= 4
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    Result Ready
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {getSampleProgress() >= 1 ? "completed" : "Pending"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-gray-700">
                  Processing:{" "}
                  <span className="text-green-700">{getProgress()}%</span>
                </div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  onClick={handleNextSample}
                >
                  Next Sample
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Tests Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Completed Reports
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field 1 */}
            {yards.length > 0 &&
              yards.map((yard) => {
                return (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold text-gray-900">
                        {yard.yardName}
                      </h3>
                      <div className="bg-green-100 py-1 px-3 rounded-full text-green-700 text-xs font-medium">
                        {yard.samples.length} samples
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      {yard.samples.map((sample, index) => (
                        <button
                          onClick={() => console.log("TODO: View report PDF")}
                          key={index}
                          className="flex w-full items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <div className="text-gray-900 font-medium">
                              {sample.sampleName}
                            </div>
                            <div className="text-gray-500 text-xs font-mono">
                              {sample.sampleId}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-gray-500 text-sm">
                              view report
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>

                    <button className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm">
                      View Recommendations
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilTestProgress;
