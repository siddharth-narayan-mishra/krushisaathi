"use client"
import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Microscope, SliceIcon as VoiceIcon, Brain, MapPin, Languages, ArrowRight, Globe2, Users } from 'lucide-react';
import Link from 'next/link';


const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const STATS = [
    { number: "10,000+", label: "Active Farmers" },
    { number: "15+", label: "Languages Supported" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
];

const FEATURES = [
    {
        icon: VoiceIcon,
        title: "Voice-Based Interface",
        description: "Natural conversations in regional languages"
    },
    {
        icon: Microscope,
        title: "Smart Soil Analysis",
        description: "Advanced soil testing with AI recommendations"
    },
    {
        icon: Brain,
        title: "AI Insights",
        description: "Intelligent farming decisions and predictions"
    },
    {
        icon: MapPin,
        title: "Precision Mapping",
        description: "Location-specific agricultural guidance"
    },
    {
        icon: Globe2,
        title: "Weather Integration",
        description: "Real-time weather updates and forecasts"
    },
    {
        icon: Languages,
        title: "Multi-Language Support",
        description: "Available in multiple Indian languages"
    }
];

const WORKFLOW_STEPS = [
    {
        step: "1",
        title: "Voice Input",
        description: "Speak about your farming needs"
    },
    {
        step: "2",
        title: "AI Analysis",
        description: "Process input and analyze farming data"
    },
    {
        step: "3",
        title: "Smart Recommendations",
        description: "Receive personalized farming insights"
    }
];

const TEAM_MEMBERS = [
    { name: "Team Member 1", role: "Full Stack Developer" },
    { name: "Team Member 2", role: "AI/ML Engineer" },
    { name: "Team Member 3", role: "UI/UX Designer" },
    { name: "Team Member 4", role: "Backend Developer" }
];


function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <motion.div
            className="text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
            <div className="text-gray-600">{label}</div>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
    return (
        <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
}

function TeamMemberCard({ name, role }: { name: string; role: string }) {
    return (
        <motion.div
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-600">{role}</p>
        </motion.div>
    );
}

function App() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <motion.nav
                className="bg-white border-b border-gray-100 sticky top-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sprout className="w-8 h-8 text-green-600" />
                            <span className="text-xl font-bold text-gray-900">KrushiSaathi</span>
                        </motion.div>
                        <div className="hidden md:flex items-center space-x-8">
                            <motion.a
                                href="#features"
                                className="text-gray-600 hover:text-green-600"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                Features
                            </motion.a>
                            <motion.a
                                href="#about"
                                className="text-gray-600 hover:text-green-600"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                About Us
                            </motion.a>
                            <Link href="/login">
                                <motion.button
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="inline-block bg-green-100 px-4 py-2 rounded-full text-green-600 font-medium text-sm mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                AI-Powered Farming Assistant
                            </motion.div>
                            <motion.h1
                                className="text-5xl font-bold text-gray-900 leading-tight mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Revolutionizing Agriculture with Voice-Based AI Technology
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                KrushiSaathi combines cutting-edge AI with traditional farming wisdom to empower small and marginal farmers across India.
                            </motion.p>
                            <motion.div
                                className="flex items-center space-x-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href="/login">
                                    <motion.button
                                        className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                                    </motion.button>
                                </Link>

                                <motion.button
                                    className="text-green-600 font-semibold flex items-center hover:text-green-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Learn More <ArrowRight className="ml-1 w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                alt="Farming Technology"
                                className="rounded-2xl shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-white">
                <motion.div
                    className="container mx-auto px-6"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={staggerContainer}
                    >
                        {STATS.map((item, idx) => (
                            <StatCard key={idx} number={item.number} label={item.label}></StatCard>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Empowering Farmers with Smart Technology
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Our AI-driven platform provides comprehensive solutions for modern farming challenges
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {FEATURES.map((item, idx) => (
                            <FeatureCard
                                key={idx}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                            />))}
                    </motion.div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How KrushiSaathi Works
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Simple steps to transform your farming practices
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {WORKFLOW_STEPS.map((item, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-green-600 font-bold">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* About Us Section */}
            <div id="about" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Meet Team SHA-404
                        </h2>
                        <p className="text-gray-600 text-lg">
                            We are a passionate team of students from NIT Rourkela, dedicated to revolutionizing agriculture through technology
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {TEAM_MEMBERS.map((item, index) => (
                            <TeamMemberCard key={index} name={item.name} role={item.role} />
                        ))}
                    </motion.div>
                    <motion.div
                        className="mt-12 text-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-gray-600">
                            Born from our shared vision at NIT Rourkela, KrushiSaathi represents our commitment to bridging the gap between technology and agriculture. Our diverse team combines expertise in AI, development, and design to create an accessible solution for farmers across India.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16">
                <motion.div
                    className="container mx-auto px-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div variants={fadeInUp}>
                            <div className="flex items-center space-x-2 mb-6">
                                <Sprout className="w-8 h-8 text-green-500" />
                                <span className="text-xl font-bold text-white">KrushiSaathi</span>
                            </div>
                            <p className="text-gray-400">
                                Empowering farmers with AI-driven agricultural solutions
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#features" className="hover:text-green-500">Features</a></li>
                                <li><a href="#about" className="hover:text-green-500">About Us</a></li>
                            </ul>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
                            <ul className="space-y-3">
                                <li>NIT Rourkela</li>
                                <li>Odisha, India</li>
                                <li>team@krushisaathi.com</li>
                            </ul>
                        </motion.div>
                    </div>
                    <motion.div
                        className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
                        variants={fadeInUp}
                    >
                        <p>&copy; 2024 KrushiSaathi by Team SHA-404. All rights reserved.</p>
                    </motion.div>
                </motion.div>
            </footer>
        </div>
    );
}

export default App;