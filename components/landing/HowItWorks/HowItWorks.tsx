import React from 'react'
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, WORKFLOW_STEPS } from '@/config/landingPageConfig';

const HowItWorks = () => {
  return (
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
        )
}

export default HowItWorks