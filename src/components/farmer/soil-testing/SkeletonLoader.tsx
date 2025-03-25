"use client";
import React from "react";
import { Leaf, Clock, MapPin } from "lucide-react";

export const SoilTestLoader: React.FC = () => {
  return (
    <div className="soil-loader-container animate-pulse">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-16">
          <div className="mx-auto w-48 h-8 bg-gray-200 rounded-full mb-4"></div>
          <div className="mx-auto w-96 h-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="mx-auto w-full max-w-xl h-6 bg-gray-200 rounded-full"></div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="w-64 h-10 bg-gray-200 rounded-full"></div>
            <div className="w-48 h-10 bg-gray-200 rounded-full"></div>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="flex justify-between mb-8">
                <div>
                  <div className="w-40 h-6 bg-gray-200 rounded-full mb-3"></div>
                  <div className="w-64 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="relative h-24 mb-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-1 bg-gray-200"></div>
                </div>
                <div className="flex justify-between relative z-10">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-6 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-grow h-2 bg-gray-200 rounded-full"></div>
                <div className="w-32 h-10 bg-gray-200 rounded-full ml-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-64 h-10 bg-gray-200 rounded-full mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="border border-gray-200 rounded-2xl p-6 space-y-4"
              >
                <div className="flex justify-between">
                  <div className="w-48 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                </div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex justify-between items-center">
                    <div>
                      <div className="w-40 h-6 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
                <div className="w-full h-10 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
