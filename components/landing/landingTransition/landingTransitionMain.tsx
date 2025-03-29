import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { MicrophoneAnimation } from "./microphoneAnimation";
import { SoundWave } from "./soundWave";
// import { BackgroundPattern } from "./backroundPatterns";
import { ChevronRight, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceChat from "@/components/farmerDashboard/VoiceChat";
import { BackgroundPattern } from "./backroundPatterns";

interface LandingTransitionProps {
  setIsTrue: (value: boolean) => void;
}

export function LandingTransition({ setIsTrue }: LandingTransitionProps) {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [showVoiceChat, setShowVoiceChat] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const toggleVoiceChat = () => {
    setShowVoiceChat((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-roboto items-center justify-center relative overflow-hidden">
      <BackgroundPattern />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary_green origin-left z-50"
        style={{ scaleX }}
      />
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-[250px] h-[250px] flex items-center justify-center"
          >
            <MicrophoneAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-6xl px-4 py-12 flex flex-col justify-center items-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="h-20 w-20 mb-6 relative"
            >
              <MicrophoneAnimation />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
                  <motion.span
                    className="bg-clip-text text-transparent bg-primary_green"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Krushi-Saathi
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                className="text-black text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Voice-powered insights for modern farming and agricultural
                operations
              </motion.p>

              <div className="mb-8 relative h-16">
                <SoundWave />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 -mt-8 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Button
                  onClick={toggleVoiceChat}
                  size="lg"
                  className="bg-gradient-to-r from-primary_green/[0.8] to-primary_green cursor-pointer hover:from-primary_green hover:to-primary_green/[0.8] text-white font-medium px-8 py-6 text-base rounded-full shadow-lg shadow-green-600/20 transition-all duration-300"
                >
                  {showVoiceChat ? "Close Voice Chat" : "Click-To-Ask"}
                  <motion.div
                    animate={{ x: isHovering ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    {showVoiceChat ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              <Button
                onClick={() => setIsTrue(true)}
                variant="outline"
                size="lg"
                className="border-primary_green text-primary_green cursor-pointer hover:text-white hover:bg-primary_green px-8 py-6 text-base rounded-full transition-all duration-300"
              >
                Farm Solutions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-16 fixed bottom-2 text-center text-black/[0.8] text-sm flex flex-wrap items-center justify-center gap-4 md:gap-8"
            >
              <p className="font-medium">
                © 2023 VoiceHarvest Agricultural Solutions
              </p>
              <div className="hidden md:block h-4 w-px bg-gray-300"></div>
              <p>Enterprise Farm Solutions</p>
              <div className="hidden md:block h-4 w-px bg-gray-300"></div>
              <p>Equipment Compatibility</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVoiceChat && (
          <motion.div className="z-10  w-full max-w-3xl mx-auto">
            <VoiceChat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
