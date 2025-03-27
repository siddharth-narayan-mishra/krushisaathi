import { LiveAPIProvider } from "@/context/LiveAPIContext";
import { useRef, useState } from "react";
import ControlTray from "../control-tray/ControlTray";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set NEXT_PUBLIC_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const VoiceChat = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  return (
    <div className="fixed right-40 bottom-5">
      <LiveAPIProvider apiKey={API_KEY} url={uri}>
        <div className="">
          <main>
            <div className="main-app-area">
              <video
                hidden={!videoRef.current || !videoStream}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            ></ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
};

export default VoiceChat;
