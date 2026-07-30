"use client";

import React, { createContext, useContext } from "react";
import { trackEvent } from "@/lib/analytics";
import type { PreferredChannel } from "@/lib/handoff";

interface HandoffPayload {
  source: string;
  preferredChannel: PreferredChannel;
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
  const beginHandoff = (payload: HandoffPayload) => {
    trackEvent("cta_clicked", {
      cta_location: payload.source,
      preferred_channel: payload.preferredChannel,
    });
    trackEvent("handoff_started", {
      cta_location: payload.source,
      preferred_channel: payload.preferredChannel,
    });
  };

  const scrollToPrimaryCapture = (source: string) => {
    trackEvent("cta_clicked", {
      cta_location: source,
      intent: "scroll_to_capture",
    });

    const captureTarget = document.getElementById("daily-miracle-capture");
    captureTarget?.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => {
      const submitButton = document.getElementById("hero-submit");
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.focus();
      }
    }, 450);
  };

  return (
    <CaptureContext.Provider value={{ beginHandoff, scrollToPrimaryCapture }}>
      {children}
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
