import { Sprout } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react'

const LandingNav = () => {
    return (
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
  )
}

export default LandingNav