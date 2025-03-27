import { Skeleton } from "./skeleton";

export const AgentDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
        <div className="col-span-4 bg-white shadow rounded-lg p-6 flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-gray-200" />
            <Skeleton className="h-4 w-80 bg-gray-200" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24 bg-gray-200" />
            <Skeleton className="h-10 w-32 bg-gray-200" />
          </div>
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-span-1 bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Skeleton className="h-6 w-6 bg-gray-200 rounded-full" />
              <Skeleton className="h-5 w-32 ml-2 bg-gray-200" />
            </div>
            <Skeleton className="h-12 w-24 mx-auto bg-gray-200" />
            <Skeleton className="h-4 w-40 mx-auto mt-2 bg-gray-200" />
          </div>
        ))}

        {/* Chart Skeleton */}
        <div className="col-span-2 bg-white shadow rounded-lg p-6">
          <Skeleton className="h-6 w-48 bg-gray-200 mb-4" />
          <Skeleton className="h-60 w-full bg-gray-200 rounded" />
        </div>

        {/* Yard Table Skeleton */}
        <div className="col-span-2 bg-white shadow rounded-lg p-6">
          <Skeleton className="h-6 w-48 bg-gray-200 mb-4" />
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-12 bg-gray-200" />
                <Skeleton className="h-4 w-24 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Samples Table Skeleton */}
        <div className="col-span-4 bg-white shadow rounded-lg p-6">
          <Skeleton className="h-6 w-48 bg-gray-200 mb-4" />
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-4 bg-gray-200" />
              <Skeleton className="h-4 bg-gray-200" />
              <Skeleton className="h-4 bg-gray-200" />
              <Skeleton className="h-4 bg-gray-200" />
              <Skeleton className="h-4 bg-gray-200" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-5 gap-4">
                <Skeleton className="h-4 bg-gray-200" />
                <Skeleton className="h-4 bg-gray-200" />
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-10 w-24 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
