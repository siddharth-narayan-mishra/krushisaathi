import React, { useEffect, useState, useContext } from "react";
import {
  CheckCircle,
  Users2,
  XCircle,
  Clock,
  BarChart2,
  TrendingUp,
  FileText
} from "lucide-react";
import { Yard } from "@/models/Yard";
import YardContext from "@/context/YardContext";
// import { StatCard } from "@/utils/ststs-card";
import UserContext from "@/context/UserContext";
import { LabModel } from "@/models/Labs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentDashboardSkeleton } from "../ui/loadingSkeleton";

const parseDate = (date: any): Date => {
  if (date instanceof Date) return date;
  if (typeof date === "string") {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  return new Date();
};

const AgentDashboardComponent = () => {
  const [yardsData, setYardsData] = useState<Yard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timelineData, setTimelineData] = useState<any[]>([]);

  const userContext = useContext(UserContext);
  const yardContext = useContext(YardContext);

<<<<<<< HEAD:components/soilAgent/AgentDashboardComponent.tsx
  //@ts-expect-error - Unreachable code error
  const { user, getUserData } = userContext;

  //@ts-expect-error - Unreachable code error
=======
  if (!userContext || !yardContext) {
    return <div>Error: Context not provided</div>;
  }

  const { user, getUserData } = userContext;
>>>>>>> c818a533aec1e556f74e7b498028a53f4c36eae0:src/components/soilAgent/AgentDashboardComponent.tsx
  const { getYards } = yardContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!user) {
          await getUserData();
        } else {
          const yards = await getYards(
            (user as LabModel).id,
            (user as LabModel).role
          );
          setYardsData(yards);

          // Generate timeline data for chart
          const monthlyStats = generateMonthlyStats(yards);
          setTimelineData(monthlyStats);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, getUserData, getYards]);

  const generateMonthlyStats = (yards: Yard[]) => {
    const monthlyData: { [key: string]: number } = {};
    yards?.forEach((yard) => {
      yard.samples.forEach((sample) => {
        const month = parseDate(sample.createdAt).toLocaleString("default", {
          month: "short"
        });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      });
    });

    return Object.entries(monthlyData)
      .map(([month, count]) => ({
        month,
        samples: count
      }))
      .sort((a, b) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });
  };

  const calculateStats = () => {
    const stats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      averageTurnaround: 0,
      yards: yardsData?.length || 0
    };

    yardsData?.forEach((yard) => {
      yard.samples.forEach((sample) => {
        stats.total++;
        switch (sample.status) {
          case "pending":
            stats.pending++;
            break;
          case "in-process":
            stats.inProgress++;
            break;
          case "completed":
            stats.completed++;
            break;
        }
      });
    });

    return stats;
  };

  const stats = calculateStats();

  if (isLoading || !yardsData) return <AgentDashboardSkeleton />;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
        <div className="col-span-4 bg-white shadow rounded-lg p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Soil Testing Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Lab: {(user as LabModel).labName} | ID: {(user as LabModel).id}
            </p>
          </div>
        </div>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users2 className="mr-2" /> Total Samples
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-500 mt-2">Across All Yards</div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Pending Samples
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Awaiting Processing
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="mr-2" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-orange-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-500 mt-2">Currently Testing</div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2" /> Completed Samples
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-500 mt-2">Finished Tests</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" /> Monthly Sample Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="samples"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2" /> Yard Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Yard Name</TableHead>
                  <TableHead>Total Samples</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yardsData.map((yard) => (
                  <TableRow key={yard.yardId}>
                    <TableCell>{yard.yardName}</TableCell>
                    <TableCell>{yard.samples.length}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {
                          yard.samples.filter((s) => s.status === "completed")
                            .length
                        }
                        / {yard.samples.length} Completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Recent Sample Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Yard Name</TableHead>
                  <TableHead>Sample Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yardsData
                  .flatMap((yard) =>
                    yard.samples.slice(0, 5).map((sample) => (
                      <TableRow key={sample.sampleId}>
                        <TableCell>{yard.yardName}</TableCell>
                        <TableCell>{sample.sampleName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              sample.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : sample.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          `}
                          >
                            {sample.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {parseDate(sample.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                  .slice(0, 5)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AgentDashboardComponent;
