import { motion } from "framer-motion";

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-0 -left-4 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -top-10 right-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute -bottom-8 left-20 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.9 }}
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></motion.div>

      <motion.svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-green-800/30"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </motion.svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-green-950/60"></div>
    </div>
  );
};
