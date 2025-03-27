import React from 'react'
import { motion } from 'motion/react';
import { staggerContainer, STATS } from '@/config/landingPageConfig';
import StatCard from './StatCard';

const StatSection = () => {
  return (
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
  )
}

export default StatSection