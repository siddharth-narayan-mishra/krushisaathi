"use client"

import { useRef, useState } from "react";
import { LiveAPIProvider } from "@/context/LiveAPIContext";
import { Altair } from "./altair/Altair";
import ControlTray from "./control-tray/ControlTray";
import cn from "classnames";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string"
) {
  throw new Error("set NEXT_PUBLIC_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function VoiceChat() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="App">
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              <Altair />
              <video
                className={cn("stream", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default VoiceChat;