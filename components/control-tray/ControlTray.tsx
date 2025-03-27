import {
  JSX,
  memo,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLiveAPIContext } from "@/context/LiveAPIContext";
import { useWebcam } from "@/hooks/use-webcam";
import { useScreenCapture } from "@/hooks/use-screen-capture";
import { UseMediaStreamResult } from "@/hooks/use-media-stream-mux";
import { AudioRecorder } from "@/lib/audio-recorder";
import AudioPulse from "../audio-pulse/AudioPulse";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Play,
  Pause,
  Cast,
  Power,
} from "lucide-react";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
  start: () => Promise<MediaStream>;
  stop: () => void;
  className?: string;
};

const MediaStreamButton = memo(
  ({
    isStreaming,
    onIcon,
    offIcon,
    start,
    stop,
    className,
  }: MediaStreamButtonProps) => (
    <button
      className={`
      p-2 
      rounded-lg 
      transition-all 
      duration-300 
      group 
      ${
        isStreaming
          ? "bg-red-600/20 text-red-500 hover:bg-red-600/30"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }
      ${className || ""}
    `}
      onClick={isStreaming ? stop : start}
    >
      {isStreaming ? onIcon : offIcon}
    </button>
  )
);

MediaStreamButton.displayName = "MediaStreamButton";

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] =
    useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { client, connected, connect, disconnect, volume } =
    useLiveAPIContext();

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`
    );
  }, [inVolume]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        { mimeType: "audio/pcm;rate=16000", data: base64 },
      ]);
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }
    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;
      if (!video || !canvas) return;
      const ctx = canvas.getContext("2d")!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0).split(",")[1];
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data: base64 }]);
      }
      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }
    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }
    return () => clearTimeout(timeoutId);
  }, [connected, activeVideoStream, client, videoRef]);

  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
      return mediaStream;
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
      return Promise.resolve(null as unknown as MediaStream);
    }
  };

  return (
    <section
      className="
        fixed 
        bottom-4 
        left-1/2 
        transform 
        -translate-x-1/2 
        bg-gray-900/80 
        backdrop-blur-md 
        rounded-xl 
        shadow-2xl 
        border 
        border-gray-800/50 
        p-4 
        w-[calc(100%-2rem)] 
        max-w-xl 
        flex 
        flex-col 
        items-center 
        space-y-4
      "
    >
      <canvas className="hidden" ref={renderCanvasRef} />
      <nav className="flex items-center justify-center gap-4 w-full">
        <div className="flex items-center gap-2">
          <button
            className={`
              p-2 
              rounded-lg 
              transition-all 
              duration-300 
              ${
                muted
                  ? "bg-red-600/20 text-red-500 hover:bg-red-600/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
            `}
            onClick={() => setMuted(!muted)}
          >
            {muted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <div
            className="
              flex 
              items-center 
              justify-center 
              w-12 
              h-12 
              bg-gray-800 
              rounded-lg 
              transition-all 
              duration-300 
              hover:bg-gray-700
            "
          >
            <AudioPulse volume={volume} active={connected} hover={false} />
          </div>
        </div>

        {supportsVideo && (
          <div className="flex items-center gap-2">
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={changeStreams(screenCapture)}
              stop={changeStreams()}
              onIcon={<MonitorOff size={24} />}
              offIcon={<Monitor size={24} />}
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={changeStreams(webcam)}
              stop={changeStreams()}
              onIcon={<VideoOff size={24} />}
              offIcon={<Video size={24} />}
            />
          </div>
        )}

        {children}
      </nav>

      <div className="flex flex-col items-center space-y-2">
        <button
          ref={connectButtonRef}
          className={`
            p-3 
            rounded-lg 
            transition-all 
            duration-300 
            flex 
            items-center 
            gap-2 
            ${
              connected
                ? "bg-red-600/20 text-red-500 hover:bg-red-600/30"
                : "bg-green-600/20 text-green-500 hover:bg-green-600/30"
            }
          `}
          onClick={connected ? disconnect : connect}
        >
          {connected ? <Pause size={24} /> : <Play size={24} />}
          <span className="text-sm">
            {connected ? "Pause" : "Start"} Streaming
          </span>
        </button>

        <span className="text-xs text-gray-400 opacity-70">
          {connected ? "Live" : "Offline"}
        </span>
      </div>
    </section>
  );
}

export default memo(ControlTray);
