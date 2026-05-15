"use client";

import dynamic from "next/dynamic";

// VoiceAgent uses WebRTC/getUserMedia — must be client-only, no SSR
const VoiceAgent = dynamic(() => import("./VoiceAgent"), { ssr: false });

export default function VoiceAgentLoader() {
  return <VoiceAgent />;
}
