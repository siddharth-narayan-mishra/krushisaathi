import React from 'react'
import { motion } from 'motion/react';
import { FEATURES, staggerContainer } from '@/config/landingPageConfig';
import FeatureCard from './FeatureCard';

const FeatureSection = () => {
  return (
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
  )
}

export default FeatureSection;