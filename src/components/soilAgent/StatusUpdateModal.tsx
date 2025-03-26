import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  Clock,
  Circle,
  RotateCw,
  CheckCircle2,
  SendIcon,
  Loader2,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";
import YardContext from "@/context/YardContext";
import { useRouter } from "next/navigation";
import navigationContext from "@/context/NavigationContext";

export type StatusType = "pending" | "in-process" | "completed";

export interface SampleData {
  sampleId: string;
  position: string;
  userId?: string;
  yardId?: string;
  labId?: string;
}

export interface StatusUpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: StatusType;
  sampleData: SampleData;
  onStatusChange?: (newStatus: StatusType) => void;
  apiEndpoint?: string;
}

export function StatusUpdateModal({
  open,
  setOpen,
  status: initialStatus,
  sampleData,
  onStatusChange,
}: // apiEndpoint = "/api/samples/update-status"
StatusUpdateModalProps) {
  const [status, setStatus] = useState<StatusType>(initialStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const yardContext = useContext(YardContext);
  const router = useRouter();
  const navigationCtx = useContext(navigationContext);
  const setActive = navigationCtx?.setActive;
  const updateYardStatus = yardContext?.updateYardStatus;
  useEffect(() => setStatus(initialStatus), [initialStatus]);
  useEffect(() => {
    if (open) setTimeout(() => setAnimateIn(true), 100);
    else setAnimateIn(false);
  }, [open]);

  const handleStatusChange = async (newStatus: StatusType) => {
    if (status === newStatus) return;
    setLoading(true);
    setError(null);

    try {
      if (!updateYardStatus) {
        throw new Error(
          "updateYardStatus function is not defined in the context."
        );
      }
      const response = await updateYardStatus({
        sampleId: sampleData.sampleId,
        yardId: sampleData.yardId ?? "",
        status: newStatus,
      });
      if (response) {
        setStatus(newStatus);
        onStatusChange?.(newStatus);
        toast.success(
          `Sample ${
            newStatus === "completed"
              ? "analysis completed"
              : "is now in process"
          }`,
          { description: `Sample ID: ${sampleData.sampleId}` }
        );
      }
    } catch (err) {
      console.error("Error updating sample status:", err);
      setError("Failed to update sample status. Please try again.");
      toast.error("Status update failed", {
        description: "There was an error updating the sample status.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendReport = () => {
    toast.success("Report sent successfully", {
      description: `Sent to ${sampleData.userId}`,
    });
    if (sampleData.userId) {
      if (setActive) {
        setActive(
          `testResults?yardId=${sampleData.yardId}&&sampleId=${sampleData.sampleId}`
        );
      }
    }
  };

  const statusConfig = {
    pending: {
      icon: (current: StatusType) =>
        current === "pending" ? (
          <Clock className="size-4 sm:size-5" />
        ) : (
          <CircleCheck className="size-4 sm:size-5" />
        ),
      color: (current: StatusType) =>
        current === "pending"
          ? "text-soil-pending bg-soil-pending/10"
          : "text-soil-completed bg-soil-completed/10",
    },
    "in-process": {
      icon: (current: StatusType) =>
        current === "in-process" ? (
          <RotateCw className="size-4 sm:size-5" />
        ) : current === "completed" ? (
          <CircleCheck className="size-4 sm:size-5" />
        ) : (
          <Circle className="size-4 sm:size-5" />
        ),
      color: (current: StatusType) =>
        current === "in-process"
          ? "text-soil-inprocess bg-soil-inprocess/10"
          : current === "completed"
          ? "text-soil-completed bg-soil-completed/10"
          : "text-gray-300 bg-gray-50",
    },
    completed: {
      icon: () => <CheckCircle2 className="size-4 sm:size-5" />,
      color: (current: StatusType) =>
        current === "completed"
          ? "text-soil-completed bg-soil-completed/10"
          : "text-gray-300 bg-gray-50",
    },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[700px] p-0 h-auto md:h-[80%] overflow-auto rounded-xl border border-gray-100 shadow-xl">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-primary_green/20 to-white" /> */}

        <DialogHeader className="px-4 md:px-8 pt-6 md:pt-8 pb-3">
          <div className="flex items-center space-x-3">
            <div className="size-8 sm:size-10 rounded-full bg-soil-green flex items-center justify-center">
              <Leaf className="size-4 sm:size-5 text-white" />
            </div>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-soil-green-dark">
              Soil Sample Status
            </DialogTitle>
          </div>

          <div className="mt-3 md:mt-6 space-y-2">
            <div
              className={`transition-all ${
                animateIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-wrap gap-3 md:grid md:grid-cols-4 md:gap-6">
                <div className="min-w-[45%] flex-1">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Sample ID
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {sampleData.sampleId}
                  </p>
                </div>
                <div className="min-w-[45%] flex-1">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    User
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {sampleData.userId}
                  </p>
                </div>
                <div className="min-w-[45%] flex-1">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Position
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {sampleData.position}
                  </p>
                </div>
                <div className="min-w-[45%] flex-1">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Status
                  </p>
                  <div className="flex items-center space-x-1.5 mt-0.5 sm:mt-1">
                    <div
                      className={`size-2 sm:size-2.5 rounded-full ${
                        status === "pending"
                          ? "bg-soil-pending"
                          : status === "in-process"
                          ? "bg-soil-inprocess"
                          : "bg-soil-completed"
                      }`}
                    />
                    <p className="text-sm sm:text-base font-medium text-gray-800 capitalize">
                      {status.replace("-", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <div className="mx-4 md:mx-8 mb-2 p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <div className="px-4 md:px-8 py-3 md:py-6">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 sm:left-5 top-8 h-[calc(100%-4rem)] w-px bg-gray-200">
              <div
                className={`absolute w-px bg-soil-completed transition-all duration-700 ${
                  animateIn ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  height:
                    status === "completed"
                      ? "100%"
                      : status === "in-process"
                      ? "50%"
                      : "0%",
                }}
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              {(["pending", "in-process", "completed"] as StatusType[]).map(
                (step, index) => (
                  <div
                    key={step}
                    className={`flex items-start gap-3 sm:gap-4 transition-all ${
                      animateIn
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  >
                    <div
                      className={`relative z-10 size-8 sm:size-10 flex items-center justify-center rounded-full transition-colors ${statusConfig[
                        step
                      ].color(status)} ${index > 0 ? "mt-1 sm:mt-2" : ""}`}
                    >
                      {loading && status === step ? (
                        <Loader2 className="size-4 sm:size-5 animate-spin" />
                      ) : (
                        statusConfig[step].icon(status)
                      )}
                    </div>

                    <div className="flex-1 pt-0.5 sm:pt-1">
                      <h3 className="text-sm sm:text-base font-semibold capitalize">
                        {step.replace("-", " ")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                        {step === "pending" &&
                          "Sample received and awaiting analysis"}
                        {step === "in-process" &&
                          "Soil sample is being analyzed"}
                        {step === "completed" &&
                          "Analysis completed, ready to send report"}
                      </p>

                      {status === step && (
                        <div className="mt-2 sm:mt-3">
                          {step !== "completed" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(
                                  step === "pending"
                                    ? "in-process"
                                    : "completed"
                                )
                              }
                              disabled={loading}
                              className={`text-xs sm:text-sm ${
                                step === "pending"
                                  ? "text-soil-inprocess border-soil-inprocess/30 hover:bg-soil-inprocess/10"
                                  : "text-soil-completed border-soil-completed/30 hover:bg-soil-completed/10"
                              } transition-all`}
                            >
                              {loading ? (
                                <Loader2 className="mr-1.5 sm:mr-2 size-3 sm:size-4 animate-spin" />
                              ) : step === "pending" ? (
                                <RotateCw className="mr-1.5 sm:mr-2 size-3 sm:size-4" />
                              ) : (
                                <CheckCircle2 className="mr-1.5 sm:mr-2 size-3 sm:size-4" />
                              )}
                              {step === "pending"
                                ? "Start Process"
                                : "Complete Analysis"}
                            </Button>
                          ) : (
                            <Button
                              onClick={handleSendReport}
                              disabled={loading}
                              className="text-xs sm:text-sm bg-primary_green hover:bg-soil-green-dark text-white"
                              size="sm"
                            >
                              {loading ? (
                                <Loader2 className="mr-1.5 sm:mr-2 size-3 sm:size-4 animate-spin" />
                              ) : (
                                <SendIcon className="mr-1.5 sm:mr-2 size-3 sm:size-4" />
                              )}
                              Send Report
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="px-4 md:px-8 py-3 sm:py-4 border-t border-gray-100">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
