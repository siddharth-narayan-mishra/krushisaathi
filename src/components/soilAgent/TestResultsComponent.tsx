import React, { useContext } from "react";
import { useFormik } from "formik";
import {
  FileText,
  User,
  MessageSquare,
  IdCard,
  UploadCloud
} from "lucide-react";
import YardContext from "@/context/YardContext";
import toast from "react-hot-toast";

interface TestResultsProps {
  userId: string;
  sampleId: string;
  labId: string;
}

export interface FormValues {
  userId: string;
  sampleId: string;
  suggestions: string;
  file?: File | null;
  fileUrl?: string;
  labId: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

export default function TestResultsComponent({
  userId,
  sampleId,
  labId
}: TestResultsProps) {
  const yardContext = useContext(YardContext);
  const sendYardReport = yardContext?.sendYardReport;
  const formik = useFormik<FormValues>({
    initialValues: {
      userId: userId,
      sampleId: sampleId,
      suggestions: "",
      labId: labId,
      file: null
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!values.file) {
          alert("Please upload a file");
          return;
        }

        const cloudinaryUrl = await uploadToCloudinary(values.file);
        const result = {
          userId: values.userId,
          sampleId: values.sampleId,
          suggestions: values.suggestions,
          fileUrl: cloudinaryUrl,
          labId: values.labId
        };
        // console.log(result);
        if (sendYardReport) {
          const response = await sendYardReport(result);
          if (response) {
            toast.success("report sent successfully!");
            window.location.reload();
          }
        } else {
          console.error("sendYardReport is undefined");
          alert("Unable to send the report. Please try again later.");
        }

        return result;
      } catch (error) {
        console.error("Submission error:", error);
        alert("Error submitting form");
      } finally {
        setSubmitting(false);
      }
    }
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource_type", "auto");
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data: CloudinaryResponse = await response.json();
      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") {
      formik.setFieldValue("file", file);
    }
  };

  return (
    <main className="bg-gray-50 font-roboto min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl text-gray-900 font-bold tracking-tight">
            Test Results
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Farmer ID
                </label>
                <input
                  name="userId"
                  value={formik.values.userId}
                  disabled={userId ? true : false}
                  className="block focus:outline-primary_green w-full px-4 py-3 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-primary_green/[0.75] 
                           placeholder:text-gray-400 transition duration-150 ease-in-out"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <IdCard className="w-4 h-4 mr-2" />
                  Sample ID
                </label>
                <input
                  name="sampleId"
                  value={formik.values.sampleId}
                  disabled={sampleId ? true : false}
                  onChange={formik.handleChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-primary_green/[0.75] 
                           placeholder:text-gray-400 transition duration-150 ease-in-out"
                  placeholder="Enter sample ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Test Result File (PDF)
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6
                            ${formik.values.file ? "bg-green-50" : "bg-gray-50"}
                            transition-colors duration-150 ease-in-out`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-semibold text-primary_green/[0.85] hover:text-primary_green/[0.85]">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            formik.setFieldValue("file", file || null);
                          }}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PDF up to 10MB
                    </p>
                    {formik.values.file && (
                      <p className="mt-2 text-sm text-green-600 font-medium">
                        {formik.values.file.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Suggestions
                </label>
                <textarea
                  name="suggestions"
                  value={formik.values.suggestions}
                  onChange={formik.handleChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-primary_green/[0.75]
                           placeholder:text-gray-400 transition duration-150 ease-in-out
                           min-h-[120px] resize-y"
                  placeholder="Enter your suggestions based on test results"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-primary_green/[0.85] text-white py-3 px-4 rounded-lg font-medium
                         hover:bg-primary_green/[0.95] focus:outline-none focus:ring-2 focus:ring-primary_green/[0.90] 
                         transition duration-150 ease-in-out shadow-sm"
              >
                {formik.isSubmitting ? "Uploading..." : "Upload Results"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
