import { motion } from "framer-motion";

export const MicrophoneAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute z-10"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0px 0px 0px rgba(16, 185, 129, 0)",
              "0px 0px 20px rgba(16, 185, 129, 0.5)",
              "0px 0px 0px rgba(16, 185, 129, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-primary_green"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1h2v1a5 5 0 0 0 10 0v-1h2z" />
            <path d="M12 18a1 1 0 0 1 1 1v3h-2v-3a1 1 0 0 1 1-1z" />
          </svg>
        </motion.div>
      </motion.div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{
            scale: [0, 1.8, 2.5],
            opacity: [0.7, 0.3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: i * 0.5,
            ease: "easeOut"
          }}
          className="absolute rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 h-14 w-14"
          style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
        />
      ))}

      <motion.div className="absolute w-[250px] h-[250px]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{
              scale: [0.4, 1 + i * 0.2],
              opacity: [0.7, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.4,
              ease: "easeOut"
            }}
            className="absolute inset-0 border-2 rounded-full border-primary_green"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </motion.div>

      {/* Decorative dots */}
      <motion.div className="absolute w-[300px] h-[300px]">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 120;
          const y = Math.sin(angle) * 120;

          return (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-green-500 dark:bg-emerald-400"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                opacity: 0.4
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
