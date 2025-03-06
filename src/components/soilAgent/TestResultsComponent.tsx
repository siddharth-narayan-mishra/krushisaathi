import React, { useState } from "react";
import { Upload, FileText, User, MessageSquare } from "lucide-react";

export default function TestResultsComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen font-['Roboto']">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl text-gray-900 font-bold tracking-tight">
            Test Results
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Upload className="w-6 h-6 text-primary_green" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Upload Test Results
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="farmer"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Farmer Username
                </label>
                <input
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-primary_green/[0.75] focus:primary_green
                           placeholder:text-gray-400 transition duration-150 ease-in-out"
                  type="text"
                  id="farmer"
                  placeholder="Enter farmer's username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="testResult"
                  className="block text-sm font-medium text-gray-700"
                >
                  Test Result File (PDF)
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6
                            ${
                              isDragging
                                ? "border-primary_green bg-blue-50"
                                : "border-gray-300"
                            }
                            ${file ? "bg-green-50" : "bg-gray-50"}
                            transition-colors duration-150 ease-in-out`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="testResult"
                        className="relative cursor-pointer rounded-md font-semibold text-primary_green/[0.85] focus-within:outline-none focus-within:ring-2 focus-within:ring-primary_green/[0.85] focus-within:ring-offset-2 hover:text-primary_green/[0.85]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="testResult"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PDF up to 10MB
                    </p>
                    {file && (
                      <p className="mt-2 text-sm text-green-600 font-medium">
                        {file.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="suggestions"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Suggestions
                </label>
                <textarea
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 
                           shadow-sm focus:ring-2 focus:ring-primary_green/[0.75] focus:border-primary_green/[0.75]
                           placeholder:text-gray-400 transition duration-150 ease-in-out
                           min-h-[120px] resize-y"
                  id="suggestions"
                  placeholder="Enter your suggestions based on test results"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary_green/[0.85] text-white py-3 px-4 rounded-lg font-medium
                         hover:bg-primary_green/[0.95] focus:outline-none focus:ring-2 focus:ring-primary_green/[0.90] 
                         focus:ring-offset-2 transition duration-150 ease-in-out
                         shadow-sm"
              >
                Upload Results
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
