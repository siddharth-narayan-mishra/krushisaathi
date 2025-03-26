"use client"
import React from 'react';
import { motion } from 'motion/react';
import { Plane as Plant, TestTube, Sprout, ThumbsUp, Calendar, Droplets, Leaf, Microscope, AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const benefits = [
        {
            icon: <Plant className="w-8 h-8 text-green-600" />,
            title: "बेहतर फसल उपज",
            englishTitle: "Better Crop Yield",
            description: "Know exactly what your soil needs to grow healthy crops"
        },
        {
            icon: <TestTube className="w-8 h-8 text-blue-600" />,
            title: "उर्वरक की बचत",
            englishTitle: "Save on Fertilizers",
            description: "Use only the fertilizers your soil actually needs"
        },
        {
            icon: <Sprout className="w-8 h-8 text-emerald-600" />,
            title: "स्वस्थ मिट्टी",
            englishTitle: "Healthy Soil",
            description: "Keep your soil healthy for years to come"
        }
    ];

    const steps = [
        {
            icon: <Calendar className="w-6 h-6 text-purple-600" />,
            title: "Best Time for Testing",
            description: "Test your soil after harvest and before sowing. This gives you time to improve the soil if needed."
        },
        {
            icon: <Droplets className="w-6 h-6 text-blue-600" />,
            title: "Soil Sample Collection",
            description: "Take samples from different parts of your field. Mix them well. This gives the most accurate results."
        },
        {
            icon: <Microscope className="w-6 h-6 text-indigo-600" />,
            title: "Testing Process",
            description: "The lab checks your soil for important nutrients like Nitrogen, Phosphorus, and Potassium."
        },
        {
            icon: <Leaf className="w-6 h-6 text-green-600" />,
            title: "Understanding Results",
            description: "You'll get a report that tells you what your soil needs. This helps you choose the right fertilizers."
        }
    ];

    const commonProblems = [
        {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            problem: "Using too much fertilizer",
            solution: "Soil testing tells you the exact amount needed"
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            problem: "Poor crop growth",
            solution: "Find out which nutrients your soil lacks"
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            problem: "Wasting money on wrong fertilizers",
            solution: "Buy only what your soil needs"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto py-16 px-4">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-gray-800 mb-3">
                            मिट्टी की जांच क्यों जरूरी है?
                        </h1>
                        <h2 className="text-3xl text-gray-700 mb-6">
                            Why is Soil Testing Important?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Just like we need regular health check-ups, your farm's soil needs testing too.
                            Good soil means better crops and more money in your pocket.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* What is Soil Testing Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.7 }}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <div className="flex items-center mb-6">
                        <ThumbsUp className="w-8 h-8 text-green-600 mr-3" />
                        <h3 className="text-2xl font-semibold">What is Soil Testing?</h3>
                    </div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-6">
                        Soil testing is like a health check-up for your farm's soil. It tells you what nutrients your soil has and what it needs.
                        Just like we need different types of food to stay healthy, your soil needs different nutrients to grow good crops.
                    </p>
                    <p className="text-gray-700 text-xl leading-relaxed">
                        When you test your soil, you get a report that tells you exactly what your soil needs.
                        This helps you use the right amount of the right fertilizers, saving you money and helping your crops grow better.
                    </p>
                </motion.div>

                {/* Benefits Section */}
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Benefits of Soil Testing</h3>
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex justify-center mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-center mb-3">
                                {benefit.title}
                            </h3>
                            <h4 className="text-xl text-gray-600 text-center mb-4">
                                {benefit.englishTitle}
                            </h4>
                            <p className="text-gray-700 text-lg text-center">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* How to Test Section */}
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How to Get Your Soil Tested</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4"
                        >
                            <div className="bg-gray-50 rounded-full p-3">
                                {step.icon}
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                                <p className="text-gray-700">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Common Problems Section */}
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Common Farming Problems Solved by Soil Testing</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    {commonProblems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex items-start space-x-4 mb-6 last:mb-0"
                        >
                            <div className="flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-semibold mb-2">{item.problem}</h4>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <p className="text-gray-700">{item.solution}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white text-center"
                >
                    <h3 className="text-3xl font-bold mb-4">
                        Get Your Soil Tested Today!
                    </h3>
                    <p className="text-xl mb-6">
                        Visit your nearest Krishi Vigyan Kendra (KVK) or Agricultural Extension Center for soil testing services.
                    </p>
                    <p className="text-lg opacity-90">
                        Testing your soil is a small step that can make a big difference in your farming success.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default App;