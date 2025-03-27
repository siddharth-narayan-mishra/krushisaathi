import { fadeInUp } from "@/config/landingPageConfig";
import { motion } from "motion/react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
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
