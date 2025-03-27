import { memo, ReactNode, RefObject, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { useLiveAPIContext } from "@/context/LiveAPIContext";
import { UseMediaStreamResult } from "@/hooks/use-media-stream-mux";
import { useScreenCapture } from "@/hooks/use-screen-capture";
import { useWebcam } from "@/hooks/use-webcam";
import {
  CameraIcon,
  CameraOffIcon,
  Mic,
  MicOff,
  PauseIcon,
  PlayIcon,
  ScreenShareIcon,
  ScreenShareOffIcon,
} from "lucide-react";

interface ControlTrayProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  supportsVideo: boolean;
  onVideoStreamChange: (stream: MediaStream | null) => void;
  children?: ReactNode; // Add children property to the interface
}

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: ReactNode;
  offIcon: ReactNode;
  start: () => Promise<MediaStream>;
  stop: () => void;
  label: string;
  index: number;
};

const MediaStreamButton = memo(
  ({
    isStreaming,
    onIcon,
    offIcon,
    start,
    stop,
    label,
    index,
  }: MediaStreamButtonProps) => (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: {
          delay: index * 0.05,
          duration: 0.2,
        },
      }}
      className={cn(
        "relative group bg-gray-700/90 hover:bg-gray-600 rounded-full p-3 flex items-center justify-center",
        isStreaming ? "ring-2 ring-green-400 shadow-lg shadow-green-400/20" : ""
      )}
      onClick={isStreaming ? stop : start}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 30 }}
        className="text-white"
      >
        {isStreaming ? onIcon : offIcon}
      </motion.span>
      <motion.div
        className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-white text-black text-xs px-2 py-1 rounded-md shadow-xl"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        {label}
      </motion.div>
    </motion.button>
  )
);

MediaStreamButton.displayName = "MediaStreamButton"; // Fix for ESLint warning

function ControlTray({
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [webcam, screenCapture] = videoStreams;
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { connected, connect, disconnect } = useLiveAPIContext();

  const changeStreams =
    (next?: UseMediaStreamResult) => async (): Promise<MediaStream> => {
      if (next) {
        const mediaStream = await next.start();
        onVideoStreamChange(mediaStream);
        return mediaStream;
      } else {
        onVideoStreamChange(null);
        throw new Error("No MediaStream available");
      }

      videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
    };

  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4"
    >
      <motion.div className="rounded-2xl p-4" layout>
        <canvas className="hidden" ref={renderCanvasRef} />

        <div className="relative flex items-center">
          <AnimatePresence mode="popLayout">
            {connected && (
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  },
                  hidden: {
                    opacity: 0,
                    transition: {
                      when: "afterChildren",
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="flex items-center space-x-3 mr-3"
              >
                <MediaStreamButton
                  isStreaming={!muted}
                  // @ts-expect-error - Unreachable code error
                  start={() => setMuted(false)}
                  stop={() => setMuted(true)}
                  onIcon={<Mic className="w-5 h-5" />}
                  offIcon={<MicOff className="w-5 h-5" />}
                  label={muted ? "Unmute" : "Mute"}
                  index={0}
                />

                {supportsVideo && (
                  <>
                    <MediaStreamButton
                      isStreaming={screenCapture.isStreaming}
                      start={changeStreams(screenCapture)}
                      stop={changeStreams()}
                      onIcon={<ScreenShareIcon className="w-5 h-5" />}
                      offIcon={<ScreenShareOffIcon className="w-5 h-5" />}
                      label="Screen Share"
                      index={2}
                    />
                    <MediaStreamButton
                      isStreaming={webcam.isStreaming}
                      start={changeStreams(webcam)}
                      stop={changeStreams()}
                      onIcon={<CameraIcon className="w-5 h-5" />}
                      offIcon={<CameraOffIcon className="w-5 h-5" />}
                      label="Camera"
                      index={3}
                    />
                  </>
                )}

                {children}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.button
            ref={connectButtonRef}
            layout
            className={cn(
              "relative group rounded-full p-4 flex items-center justify-center shadow-lg",
              connected
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
            )}
            onClick={connected ? disconnect : connect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              className="text-white"
            >
              {connected ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </motion.span>
            <motion.div
              className="absolute -top-8 opacity-0 group-hover:opacity-100 backdrop-blur-sm text-black text-xs px-2 py-1 rounded-md shadow-xl"
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
            >
              {connected ? "Stop Streaming" : "Start Streaming"}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}

ControlTray.displayName = "ControlTray"; // Fix for ESLint warning

export default memo(ControlTray);
