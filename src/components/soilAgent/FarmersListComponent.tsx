import React, { useEffect, useState, useContext } from "react";
import { Search, ChevronDown, ChevronUp, Eye, BeakerIcon } from "lucide-react";
import { Yard } from "@/models/Yard";
import YardContext from "@/context/YardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { StatusType, StatusUpdateModal } from "./StatusUpdateModal";
import UserContext from "@/context/UserContext";
import { LabModel } from "@/models/Labs";

interface SampleRow {
  yardId?: string;
  yardName?: string;
  userId?: string;
  sampleId?: string;
  sampleName?: string;
  status?: string;
  labId?: string;
}

const FarmerListComponent = () => {
  const [yardsData, setYardsData] = useState<Yard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof SampleRow>("sampleId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleRow | null>(null);

  const yardContext = useContext(YardContext);
  const userContext = useContext(UserContext);

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
        }

        if ((user as LabModel).id) {
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
  }, [user, getUserData, getYards]);

  const getStatusDotColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
      case "completed":
        return "bg-primary_green";
      case "pending":
        return "bg-soil-pending";
      case "in-process":
      case "in process":
        return "bg-orange-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-400";
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

  const mapStatusToModalStatus = (status: string): StatusType => {
    switch (status?.toLowerCase()) {
      case "complete":
      case "completed":
        return "completed";
      case "in-process":
      case "in process":
        return "in-process";
      case "pending":
      default:
        return "pending";
    }
  };

  const openSampleModal = (sample: SampleRow) => {
    setSelectedSample(sample);
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus: StatusType) => {
    console.log(
      `Status updated for sample ${selectedSample?.sampleId} to ${newStatus}`
    );
    if (selectedSample && yardsData) {
      setYardsData(
        yardsData.map((yard) => ({
          ...yard,
          samples: yard.samples.map((sample) =>
            sample.sampleId === selectedSample.sampleId
              ? { ...sample, status: newStatus }
              : sample
          ),
        }))
      );
    }
  };

  const flattenedSamples: SampleRow[] =
    yardsData?.flatMap((yard) =>
      yard.samples.map((sample) => ({
        yardId: yard.yardId,
        yardName: yard.yardName,
        userId: yard.userId,
        sampleId: sample.sampleId,
        sampleName: sample.sampleName,
        status: sample.status,
      }))
    ) || [];

  const sortedAndFilteredSamples = flattenedSamples
    .filter((sample) =>
      Object.values(sample).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  if (isLoading)
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

  if (!yardsData)
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
    <main className="min-h-screen font-roboto bg-gradient-to-br from-gray-50 to-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Farmers List
          </h1>
          <div className="relative flex-1 max-w-md ml-auto">
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

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 ${sortField === "sampleId" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleSort("sampleId")}
            >
              Sample ID
              <SortIcon field="sampleId" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 ${sortField === "yardName" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleSort("yardName")}
            >
              Yard Name
              <SortIcon field="yardName" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 ${sortField === "status" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleSort("status")}
            >
              Status
              <SortIcon field="status" />
            </Button>
          </div>

          {sortedAndFilteredSamples.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="p-8 text-center text-slate-500 font-medium">
                  No samples found matching your search
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAndFilteredSamples.map((sample, index) => (
                <Card
                  key={`${sample.yardId}-${sample.sampleId}`}
                  className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-soil-lightgreen rounded-md">
                          <BeakerIcon className="h-5 w-5 text-soil-green" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`h-2.5 w-2.5 rounded-full animate-pulse ${getStatusDotColor(
                              sample.status || ""
                            )}`}
                          />
                          <span className="text-xs font-medium text-gray-500 capitalize">
                            {(sample.status ?? "").charAt(0).toUpperCase() +
                              sample.status?.slice(1)}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium mb-1">
                        Sample #{sample.sampleId}
                      </h3>

                      <div className="space-y-2 mt-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                              User ID
                            </p>
                            <p className="font-medium text-gray-800">
                              {sample.userId}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                              Sample Name
                            </p>
                            <p className="font-medium text-gray-800">
                              {sample.sampleName}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Yard Name
                          </p>
                          <p className="font-medium text-gray-800">
                            {sample.yardName}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <Button
                        onClick={() => openSampleModal(sample)}
                        className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View & Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-sm text-gray-600 mt-4">
            Showing {sortedAndFilteredSamples.length} results
          </div>
        </div>
      </div>

      {selectedSample && (
        <StatusUpdateModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          status={mapStatusToModalStatus(selectedSample.status || "pending")}
          sampleData={{
            sampleId: selectedSample.sampleId || "",
            userId: selectedSample.userId || "",
            position: selectedSample.yardName || "",
            yardId: selectedSample.yardId || "",
            labId: selectedSample.labId || "",
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </main>
  );
};

export default FarmerListComponent;
