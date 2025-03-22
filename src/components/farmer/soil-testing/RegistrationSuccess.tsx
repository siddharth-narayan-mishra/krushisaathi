"use client";

import { useRouter } from "next/navigation";
import { Building2, ChevronLeft, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface RegistrationSuccessProps {
  createdYard: {
    farmName: string;
    samples: Array<{
      sampleId: string;
      sampleName: string;
    }>;
  };
  lab: {
    labName: string;
    address?: {
      district: string;
      fulladdress: string;
    };
    phone: string;
  };
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  createdYard,
  lab,
}) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">
              {createdYard.farmName || "Farm Registration Complete"}
            </h2>

            <div className="rounded-lg overflow-hidden border border-emerald-200 bg-white">
              <table className="w-full">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="px-6 py-3 text-center font-semibold text-emerald-800">
                      Sample No.
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-emerald-800">
                      Sample Name
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-emerald-800">
                      Sample ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createdYard.samples.map((sample, index) => (
                    <tr
                      key={sample.sampleId}
                      className="border-b border-emerald-100 hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 text-center">
                        {sample.sampleName}
                      </td>
                      <td className="px-6 py-4 text-center font-mono font-medium">
                        {sample.sampleId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-emerald-700 font-medium text-sm bg-emerald-100 inline-block px-4 py-2 rounded-full">
                Please write the ID number on each sample before submitting them to the selected laboratory
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Laboratory Details
              </h3>
              {lab.labName ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <Building2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">
                      {lab.labName}, {lab.address?.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>{lab.address?.fulladdress}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>{lab.phone}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  Loading laboratory details...
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-2.5 text-emerald-700 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Return to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;