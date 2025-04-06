import React from "react";
import { motion } from "motion/react";
import { staggerContainer, TEAM_MEMBERS } from "@/config/landingPageConfig";
import TeamMemberCard from "./TeamMembersCard";

const AboutUs = () => {
  return (
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
            We are a passionate team of students from NIT Rourkela, dedicated to
            revolutionizing agriculture through technology
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
            <TeamMemberCard
              key={index}
              name={item.name}
              role={item.role}
              imgUrl={item.imgUrl}
            />
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
            Born from our shared vision at NIT Rourkela, KrushiSaathi represents
            our commitment to bridging the gap between technology and
            agriculture. Our diverse team combines expertise in AI, development,
            and design to create an accessible solution for farmers across
            India.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
