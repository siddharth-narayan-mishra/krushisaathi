import { motion } from "framer-motion";

export const SoundWave = () => {
  return (
    <svg
      width="500"
      height="64"
      viewBox="0 0 500 64"
      className="absolute w-full max-w-md mx-auto opacity-60"
    >
      <defs>
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,32 Q31.25,16 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32"
        fill="none"
        stroke="url(#waveGradient1)"
        strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 0.8,
          d: [
            "M0,32 Q31.25,16 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32",
            "M0,32 Q31.25,48 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32",
            "M0,32 Q31.25,24 62.5,32 T125,20 T187.5,32 T250,44 T312.5,32 T375,20 T437.5,32 T500,32",
            "M0,32 Q31.25,32 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32"
          ]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      <motion.path
        d="M0,32 Q31.25,28 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32"
        fill="none"
        stroke="url(#waveGradient2)"
        strokeWidth="2.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 0.6,
          d: [
            "M0,32 Q31.25,28 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32",
            "M0,32 Q31.25,42 62.5,32 T125,26 T187.5,32 T250,38 T312.5,32 T375,26 T437.5,32 T500,32",
            "M0,32 Q31.25,30 62.5,32 T125,38 T187.5,32 T250,26 T312.5,32 T375,38 T437.5,32 T500,32",
            "M0,32 Q31.25,32 62.5,32 T125,32 T187.5,32 T250,32 T312.5,32 T375,32 T437.5,32 T500,32"
          ]
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.2
        }}
      />

      {/* Additional wave elements */}
      <motion.g className="opacity-40">
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 75}
            cy="32"
            r="3"
            fill="#10b981"
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
};
