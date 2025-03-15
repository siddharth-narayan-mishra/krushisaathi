import React, { useState, useEffect } from "react";
import { Eye, Pencil, Search, ChevronDown, ChevronUp } from "lucide-react";
import { getLabUsers, UseUser } from "@/utils/getuser";

interface Farmer {
  userId: string;
  farmName: string;
  sampleNames: { position: string; status: string }[];
}

function FarmersListComponent() {
  const user = UseUser();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Farmer>("farmName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = () => {
      const labUsers = getLabUsers(user);
      console.log("Fetched lab users:", labUsers);
      setFarmers(labUsers || []);
    };

    if (user) fetchUsers();
  }, [user]);

  const handleSort = (field: keyof Farmer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredFarmers = farmers
    .filter((farmer) =>
      farmer.farmName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const countSamplesByStatus = (farmer: Farmer, status: string) => {
    return (
      farmer.sampleNames?.filter((sample) => sample.status === status).length ||
      0
    );
  };

  const getOverallStatus = (farmer: Farmer) => {
    const pendingCount = countSamplesByStatus(farmer, "pending");
    const completeCount = countSamplesByStatus(farmer, "complete");
    const rejectedCount = countSamplesByStatus(farmer, "rejected");

    if (rejectedCount > 0) return "rejected";
    if (pendingCount > 0) return "pending";
    if (completeCount > 0) return "complete";
    return "pending";
  };

  const SortIcon = ({ field }: { field: keyof Farmer }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    );
  };

  return (
    <main className="p-5 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl text-gray-900 font-bold mb-7">Farmers List</h1>

        <div className="mb-4 flex font-roboto items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search farmers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white font-roboto rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SerialNo.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("farmName")}
                  >
                    Farm Name <SortIcon field="farmName" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sample Positions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredFarmers.map((farmer, index) => (
                  <tr
                    key={farmer.userId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6  py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {farmer.farmName}
                    </td>
                    <td className="px-6 py-4">
                      {farmer.sampleNames
                        ?.map((sample) => sample.position)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            getOverallStatus(farmer)
                          )}`}
                        >
                          {getOverallStatus(farmer).charAt(0).toUpperCase() +
                            getOverallStatus(farmer).slice(1)}
                        </span>
                        <div className="text-xs text-gray-500">
                          {countSamplesByStatus(farmer, "pending") > 0 && (
                            <span className="mr-2">
                              Pending: {countSamplesByStatus(farmer, "pending")}
                            </span>
                          )}
                          {countSamplesByStatus(farmer, "complete") > 0 && (
                            <span className="mr-2">
                              Complete:{" "}
                              {countSamplesByStatus(farmer, "complete")}
                            </span>
                          )}
                          {countSamplesByStatus(farmer, "rejected") > 0 && (
                            <span>
                              Rejected:{" "}
                              {countSamplesByStatus(farmer, "rejected")}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          className="text-gray-600 hover:text-primary_green transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-primary_green transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FarmersListComponent;
