"use client";
import React from "react";
import {
  LandingNav,
  HeroSection,
  FeatureSection,
  HowItWorks,
  AboutUs,
  LandingFooter
} from "@/components/landing";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <AboutUs />
      <LandingFooter />
    </div>
  );
}

export default App;
