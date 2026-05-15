"use client";

import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

const AGENT_ID = "agent_6001krp64q3qe3ttq9v298b7at7c";

// ── Inner widget (must live inside ConversationProvider) ───────────────────
function AgentWidget() {
  const { lang } = useLanguage();
  const isFr = lang === "fr";
  const [error, setError] = useState<string | null>(null);

  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { isSpeaking } = useConversationMode();

  const isConnected  = status === "connected";
  const isConnecting = status === "connecting";

  const handleToggle = useCallback(async () => {
    if (isConnected || isConnecting) {
      endSession();
      return;
    }
    setError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await startSession({ connectionType: "webrtc" });
    } catch {
      setError(isFr ? "Micro non autorisé" : "Microphone access denied");
    }
  }, [isConnected, isConnecting, startSession, endSession, isFr]);

  const label = isConnecting
    ? (isFr ? "Connexion…" : "Connecting…")
    : isConnected
      ? isSpeaking
        ? (isFr ? "L'agent parle…" : "Agent speaking…")
        : (isFr ? "Je vous écoute" : "Listening…")
      : (isFr ? "Parler à notre agent" : "Talk to our agent");

  const bg      = isConnected ? "#B8975A" : "#5C6BC0";
  const bgHover = isConnected ? "#a8874a" : "#4a5ab8";

  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
    }}>
      {/* Error */}
      {error && (
        <div style={{
          background: "rgba(26,26,26,0.95)", border: "1px solid rgba(245,242,237,0.12)",
          borderRadius: "4px", padding: "8px 14px", fontSize: "12px",
          color: "rgba(245,242,237,0.8)", fontFamily: "'DM Sans', sans-serif", maxWidth: "200px", textAlign: "right",
        }}>
          {error}
        </div>
      )}

      {/* Status pill */}
      {(isConnected || isConnecting) && (
        <div style={{
          background: "rgba(26,26,26,0.92)", border: "1px solid rgba(245,242,237,0.1)",
          borderRadius: "20px", padding: "6px 14px", fontSize: "12px",
          color: "rgba(245,242,237,0.75)", fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.03em", backdropFilter: "blur(8px)",
        }}>
          {label}
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleToggle}
        title={label}
        style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: bg, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isConnected
            ? `0 0 0 ${isSpeaking ? "14px" : "6px"} rgba(184,151,90,0.15), 0 4px 20px rgba(0,0,0,0.3)`
            : "0 4px 20px rgba(0,0,0,0.25)",
          transition: "background 0.25s, box-shadow 0.4s, transform 0.2s",
          transform: isConnecting ? "scale(0.9)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = bgHover;
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = bg;
          e.currentTarget.style.transform = isConnecting ? "scale(0.9)" : "scale(1)";
        }}
      >
        {isConnected ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF">
            <rect x="5" y="5" width="14" height="14" rx="2"/>
          </svg>
        ) : isConnecting ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "agentSpin 1s linear infinite" }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="12" rx="3"/>
            <path d="M5 10a7 7 0 0 0 14 0"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="9" y1="22" x2="15" y2="22"/>
          </svg>
        )}
      </button>

      {/* Idle label */}
      {!isConnected && !isConnecting && (
        <div style={{
          fontSize: "10px", letterSpacing: "0.08em",
          color: "rgba(100,100,100,0.6)", fontFamily: "'DM Sans', sans-serif",
          textAlign: "center", maxWidth: "56px", lineHeight: 1.4,
        }}>
          {isFr ? "Agent IA" : "AI Agent"}
        </div>
      )}

      <style jsx global>{`
        @keyframes agentSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ── Exported wrapper — ConversationProvider + SSR guard ────────────────────
export default function VoiceAgent() {
  return (
    <ConversationProvider agentId={AGENT_ID}>
      <AgentWidget />
    </ConversationProvider>
  );
}
