import React, { useState } from "react";
import { Eye, Pencil, Search, ChevronDown, ChevronUp } from "lucide-react";

interface Farmer {
  id: string;
  name: string;
  username: string;
  registrationDate: string;
  status: "active" | "pending" | "inactive";
}

const MOCK_FARMERS: Farmer[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    username: "rajesh_k",
    registrationDate: "2024-02-15",
    status: "active"
  },
  {
    id: "2",
    name: "Priya Patel",
    username: "priya_p",
    registrationDate: "2024-02-14",
    status: "pending"
  },
  {
    id: "3",
    name: "Amit Singh",
    username: "amit_s",
    registrationDate: "2024-02-13",
    status: "active"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    username: "sneha_r",
    registrationDate: "2024-02-12",
    status: "inactive"
  },
  {
    id: "5",
    name: "Vikram Sharma",
    username: "vikram_s",
    registrationDate: "2024-02-11",
    status: "active"
  }
];

function FarmersListComponent() {
  const [farmers, setFarmers] = useState<Farmer[]>(MOCK_FARMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Farmer>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Farmer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredFarmers = farmers
    .filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const getStatusColor = (status: Farmer["status"]) => {
    switch (status) {
      case "active":
        return "bg-black text-white";
      case "pending":
        return "bg-black text-white";
      case "inactive":
        return "bg-black text-white";
    }
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
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    Name <SortIcon field="name" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("username")}
                  >
                    Username <SortIcon field="username" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("registrationDate")}
                  >
                    Registration Date <SortIcon field="registrationDate" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("status")}
                  >
                    Status <SortIcon field="status" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredFarmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {farmer.name}
                    </td>
                    <td className="px-6 py-4">{farmer.username}</td>
                    <td className="px-6 py-4">
                      {new Date(farmer.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          farmer.status
                        )}`}
                      >
                        {farmer.status.charAt(0).toUpperCase() +
                          farmer.status.slice(1)}
                      </span>
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
