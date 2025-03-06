"use client";

import { useState } from "react";
export default function TestResults() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(file);
  };

  return (
    <main className="bg-[#f3f4f6] h-screen">
      <div className="space-y-4 p-5">
        <h1 className="text-2xl text-primary_black font-semibold mb-7">
          Test Results
        </h1>
        <div className="w-full max-w-2xl mx-auto bg-white p-5 border rounded-lg shadow-md">
          <div>
            <h1 className="text-bold text-2xl">Upload Test Results</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-10 mt-5">
              <div className="space-y-2">
                <label htmlFor="farmer">Farmer Username</label>
                <input
                  className="block border-2 w-full rounded-md h-10 pl-2"
                  type="text"
                  id="farmer"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="testResult">Test Result File (PDF)</label>
                <input
                  className="block w-full"
                  id="testResult"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="farmer">Suggestions</label>
                <textarea
                  className="block border-2 w-full rounded-md pl-2"
                  id="farmer"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded-md">
                Upload Results
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
