import React from "react";
import { motion } from "motion/react";
import { fadeInUp } from "@/config/landingPageConfig";
import { Sprout } from "lucide-react";

const LandingFooter = () => {
  return (
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
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-green-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-green-500">
                  About Us
                </a>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>NIT Rourkela</li>
              <li>Odisha, India</li>
              <li>hk9797592893@gmail.com</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          variants={fadeInUp}
        >
          <p>Made with ❤️ by Team SHA-404</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default LandingFooter;
