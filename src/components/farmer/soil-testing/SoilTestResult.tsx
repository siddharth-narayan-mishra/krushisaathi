import { useState } from "react";
import { ChevronRight, Check, Clock } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const progressPercent = 50; // Set to your desired progress amount (1-3 steps out of 4)

  return (
    <div className="min-h-screen bg-soil-gray-50 antialiased">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block py-1 px-3 rounded-full bg-soil-green-100 text-soil-green-700 text-xs font-medium mb-2">
            Soil Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-soil-gray-900 tracking-tight mb-2">
            Soil Testing
          </h1>
          <p className="text-soil-gray-600 max-w-lg mx-auto">
            Track your soil analysis progress and view completed test results
          </p>
        </div>

        {/* In Progress Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-soil-gray-800">In Progress</h2>
            <div className="flex items-center text-sm text-soil-green-600">
              <span className="mr-1">View All</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="test-card bg-soil-green-50 rounded-2xl p-6 sm:p-8 border border-soil-green-200 shadow-sm" style={{ "--index": "0" } as React.CSSProperties}>
            <div className="flex justify-between items-center mb-5">
              <div>
                <div className="text-sm text-soil-gray-500 mb-1">1 of 5</div>
                <div className="flex items-center">
                  <div className="font-semibold text-soil-gray-900">Yard 1</div>
                  <div className="ml-2 py-1 px-2 rounded-md bg-soil-gray-200 text-soil-gray-700 text-xs font-mono">
                    ST10051
                  </div>
                </div>
              </div>
              <div className="text-soil-green-600 text-sm font-medium px-3 py-1 bg-soil-green-100 rounded-full">
                <Clock size={14} className="inline-block mr-1 relative -top-[1px]" />
                5 Hours Remaining
              </div>
            </div>

            {/* Progress steps */}
            <div className="flex justify-between items-center mb-5 relative">
              <div className="absolute top-[12px] left-0 w-full h-[2px] bg-soil-gray-200 -z-10"></div>
              
              <div className="progress-track absolute top-[12px] left-0 w-full -z-10">
                <div 
                  className="progress-bar" 
                  style={{ "--progress-width": `${progressPercent}%` } as React.CSSProperties}
                ></div>
              </div>
              
              <div className="status-step">
                <div className="status-icon status-completed">
                  <Check size={16} />
                </div>
                <div className="status-label">Registered</div>
              </div>
              
              <div className="status-step">
                <div className="status-icon status-completed">
                  <Check size={16} />
                </div>
                <div className="status-label">Sample Received</div>
              </div>
              
              <div className="status-step">
                <div className="status-icon status-active">
                  <span>3</span>
                </div>
                <div className="status-label">Lab Processing</div>
              </div>
              
              <div className="status-step">
                <div className="status-icon status-pending">
                  <span>4</span>
                </div>
                <div className="status-label">Result Ready</div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTab === index ? "bg-soil-green-600 w-4" : "bg-soil-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Completed Tests Section */}
        <div>
          <h2 className="text-xl font-semibold text-soil-gray-800 mb-4">Completed Tests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yard 1 */}
            <div className="test-card" style={{ "--index": "1" } as React.CSSProperties}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-soil-green-800">Yard 1</h3>
                <div className="bg-soil-green-100 py-1 px-3 rounded-full text-soil-green-700 text-xs">
                  5 tests
                </div>
              </div>
              
              {["Top Left Corner", "Bottom Left Corner", "Top Right Corner", "Bottom Right Corner", "Center Area"].map((location, index) => (
                <div key={index} className="test-item" style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                  <div>
                    <div className="text-soil-gray-900 font-medium">{location}</div>
                    <div className="text-soil-gray-500 text-sm font-mono">ST10011</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-soil-gray-500 text-sm mr-2">June 1, 2024</div>
                    <ChevronRight size={16} className="text-soil-gray-400" />
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-4 py-2.5 bg-soil-green-600 text-white rounded-lg font-medium hover:bg-soil-green-700 transition-colors shadow-sm">
                View Smart Recommendations
              </button>
            </div>
            
            {/* Yard 2 */}
            <div className="test-card" style={{ "--index": "2" } as React.CSSProperties}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-soil-green-800">Yard 2</h3>
                <div className="bg-soil-green-100 py-1 px-3 rounded-full text-soil-green-700 text-xs">
                  5 tests
                </div>
              </div>
              
              {["Top Left Corner", "Bottom Left Corner", "Top Right Corner", "Bottom Left Corner", "Center Area"].map((location, index) => (
                <div key={index} className="test-item" style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                  <div>
                    <div className="text-soil-gray-900 font-medium">{location}</div>
                    <div className="text-soil-gray-500 text-sm font-mono">ST10011</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-soil-gray-500 text-sm mr-2">June 1, 2024</div>
                    <ChevronRight size={16} className="text-soil-gray-400" />
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-4 py-2.5 bg-soil-green-600 text-white rounded-lg font-medium hover:bg-soil-green-700 transition-colors shadow-sm">
                View Smart Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
