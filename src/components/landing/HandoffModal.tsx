"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildHandoffUrl } from "@/lib/handoff";

interface HandoffModalProps {
  email: string;
  language: string;
  source: string;
  onClose: () => void;
}

type HandoffState = "sending" | "success";

export default function HandoffModal({
  email,
  language,
  source,
  onClose,
}: HandoffModalProps) {
  const [state, setState] = useState<HandoffState>("sending");

  useEffect(() => {
    const successTimeout = setTimeout(() => {
      setState("success");

      trackEvent("handoff_success", {
        cta_location: source,
        selected_language: language,
      });
    }, 1400);

    const redirectTimeout = setTimeout(() => {
      window.location.assign(buildHandoffUrl(email, language, source));
    }, 2400);

    return () => {
      clearTimeout(successTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [email, language, source]);

  const copy =
    language === "tl"
      ? {
          eyebrow: "Himala Every Day",
          sendingTitle: "Sandali lang...",
          sendingBody:
            "Ikinokonekta ka namin sa iyong daily miracle sign-up.",
          successTitle: "Handa na ang iyong miracle",
          successBody:
            "Ililipat ka namin sa subscribe form na may pre-filled na details mo.",
          closeLabel: "Isara",
        }
      : {
          eyebrow: "Himala Every Day",
          sendingTitle: "One moment...",
          sendingBody:
            "We are connecting you to your daily miracle sign-up.",
          successTitle: "Your miracle is ready",
          successBody:
            "We are taking you to the subscribe form with your details pre-filled.",
          closeLabel: "Close",
        };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      >
        <button
          type="button"
          aria-label={copy.closeLabel}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark-brown/82 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-lg overflow-hidden rounded-[36px] border border-white/12 bg-white/8 shadow-[0_35px_90px_rgba(16,10,7,0.45)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,162,81,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />

          <div className="relative p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold/85">
                  {copy.eyebrow}
                </p>
                <h2 className="max-w-sm text-3xl font-serif leading-tight text-white">
                  {state === "sending" ? copy.sendingTitle : copy.successTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/6 p-2 text-white/70 transition-colors hover:bg-white/12 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {state === "sending" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/12 text-brand-gold">
                    <Loader2 className="h-7 w-7 animate-spin" />
                  </div>

                  <p className="max-w-sm text-sm leading-relaxed text-white/72">
                    {copy.sendingBody}
                  </p>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#DCA251_0%,#F0C98A_100%)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, ease: "linear" }}
                  />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-300/20">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <p className="max-w-sm text-sm leading-relaxed text-white/72">
                  {copy.successBody}
                </p>

                <div className="rounded-[24px] border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/72">
                  <span className="mr-2 font-semibold text-white">Email:</span>
                  <span className="break-all">{email}</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
