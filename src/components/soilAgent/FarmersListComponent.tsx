import React, { useEffect, useState, useContext } from "react";
import { Search, ChevronDown, ChevronUp, Eye, Pencil } from "lucide-react";
import { YardModel } from "@/models/Yard";
import { getLabId, UseUser } from "@/utils/getData";
import YardContext from "@/context/yardContext";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface SampleRow {
  yardId: string;
  yardName: string;
  userId: string;
  sampleId: string;
  sampleName: string;
  status: string;
}

const FarmerListComponent = () => {
  const [yardData, setYardData] = useState<YardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof SampleRow>("sampleId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const LabData = UseUser();
  const yardContext = useContext(YardContext);
  const labId = getLabId(LabData);

  useEffect(() => {
    const fetchData = async () => {
      if (!labId || !yardContext) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await yardContext.getYard(labId);
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

  const handleSort = (field: keyof SampleRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: keyof SampleRow }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    );
  };

  const flattenedSamples =
    yardData?.samples?.map((sample) => ({
      yardId: yardData.yardId,
      yardName: yardData.yardName,
      userId: yardData.userId,
      sampleId: sample.sampleId,
      sampleName: sample.sampleName,
      status: sample.status
    })) || [];

  const sortedAndFilteredSamples = flattenedSamples
    .filter((sample) =>
      Object.values(sample).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  // const stats = [];

  if (loading)
    return (
      <Card className="w-full max-w-7xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="space-y-4 py-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-96 w-full" />
          </div>
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="w-full max-w-7xl mx-auto mt-8 border-red-200">
        <CardContent className="p-6">
          <div className="p-8 text-center text-red-500 font-medium">
            {error}
          </div>
        </CardContent>
      </Card>
    );

  if (!yardData)
    return (
      <Card className="w-full max-w-7xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="p-8 text-center text-slate-500 font-medium">
            No yard data available
          </div>
        </CardContent>
      </Card>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900  mb-4">
            Farmers List
          </h1>
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Search samples..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card className="overflow-hidden border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SL No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort("userId")}
                  >
                    <div className="flex items-center">
                      User ID
                      <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SortIcon field="userId" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort("yardName")}
                  >
                    <div className="flex items-center">
                      Yard Name
                      <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SortIcon field="yardName" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort("sampleId")}
                  >
                    <div className="flex items-center">
                      Sample ID
                      <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SortIcon field="sampleId" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort("sampleName")}
                  >
                    <div className="flex items-center">
                      Sample Name
                      <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SortIcon field="sampleName" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <SortIcon field="status" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredSamples.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-gray-500 font-medium"
                    >
                      No samples found matching your search
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredSamples.map((sample, index) => (
                    <tr
                      key={`${sample.yardId}-${sample.sampleId}`}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {sample.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {sample.yardName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {sample.sampleId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {sample.sampleName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            sample.status
                          )}`}
                        >
                          {sample.status.charAt(0).toUpperCase() +
                            sample.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-green-600 hover:bg-green-50"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {sortedAndFilteredSamples.length} results
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default FarmerListComponent;
