"use client"
import React from 'react';
import { LandingNav, HeroSection, FeatureSection, HowItWorks, AboutUs, LandingFooter } from "@/components/landing"

function App() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <LandingNav />

            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}

            {/* Features Section */}
            <FeatureSection />

            {/* How It Works */}
            <HowItWorks />

            {/* About Us */}
            <AboutUs />

            {/* Footer */}
            <LandingFooter />
        </div>
    );
}

export default App;