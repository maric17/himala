"use client";

import React, { createContext, useContext, useState } from "react";
import HandoffModal from "@/components/landing/HandoffModal";
import { trackEvent } from "@/lib/analytics";

interface HandoffPayload {
  email: string;
  language: string;
  source: string;
}

interface CaptureContextValue {
  beginHandoff: (payload: HandoffPayload) => void;
  scrollToPrimaryCapture: (source: string) => void;
}

const CaptureContext = createContext<CaptureContextValue | null>(null);

export function LandingCaptureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [handoff, setHandoff] = useState<HandoffPayload | null>(null);

  const beginHandoff = (payload: HandoffPayload) => {
    trackEvent("cta_clicked", {
      cta_location: payload.source,
      selected_language: payload.language,
    });
    trackEvent("handoff_started", {
      cta_location: payload.source,
      selected_language: payload.language,
      email_captured: true,
    });
    setHandoff(payload);
  };

  const scrollToPrimaryCapture = (source: string) => {
    trackEvent("cta_clicked", {
      cta_location: source,
      intent: "scroll_to_capture",
    });

    const captureTarget = document.getElementById("daily-miracle-capture");
    captureTarget?.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => {
      const emailInput = document.getElementById("hero-email");
      if (emailInput instanceof HTMLInputElement) {
        emailInput.focus();
      }
    }, 450);
  };

  return (
    <CaptureContext.Provider value={{ beginHandoff, scrollToPrimaryCapture }}>
      {children}
      {handoff ? (
        <HandoffModal
          key={`${handoff.email}-${handoff.language}-${handoff.source}`}
          email={handoff.email}
          language={handoff.language}
          source={handoff.source}
          onClose={() => setHandoff(null)}
        />
      ) : null}
    </CaptureContext.Provider>
  );
}

export function useLandingCapture() {
  const context = useContext(CaptureContext);

  if (!context) {
    throw new Error("useLandingCapture must be used within LandingCaptureProvider");
  }

  return context;
}
