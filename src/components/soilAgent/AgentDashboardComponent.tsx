import React from "react";

const AgentDashboardComponent = () => {
  return (
    <main className="p-5 bg-[#f3f4f6] h-screen">
      <h1 className="text-2xl text-primary_black font-semibold">
        Welcome to Krushisaathi Soil Agent Dashboard
      </h1>
      <div className="flex flex-wrap mt-10 gap-10">
        <div className="rounded-lg shadow-md p-5 w-full md:w-[270px] bg-white">
          Total Farmers
          <div>234</div>
        </div>
        <div className="rounded-lg shadow-md p-5 w-full md:w-[270px] bg-white">
          Pending Requests
          <div>234</div>
        </div>
        <div className="rounded-lg shadow-md p-5 w-full md:w-[270px] bg-white">
          Sample Processing
          <div>234</div>
        </div>
        <div className="rounded-lg shadow-md p-5 w-full md:w-[270px] bg-white">
          Completed Tests
          <div>234</div>
        </div>
      </div>
    </main>
  );
};

export default AgentDashboardComponent;
