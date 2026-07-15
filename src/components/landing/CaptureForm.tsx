"use client";

import React, { FormEvent, useState } from "react";
import { ArrowRight, Bot, Mail, MessageCircle } from "lucide-react";
import { useLandingCapture } from "@/components/landing/CaptureProvider";
import {
  buildHandoffUrl,
  CHANNEL_OPTIONS,
  DEFAULT_CHANNEL,
  type PreferredChannel,
} from "@/lib/handoff";
import { openMiracleChat } from "@/lib/miracle-chat";

type CaptureFormVariant = "hero" | "panel" | "compact";

interface CaptureFormProps {
  source: string;
  variant?: CaptureFormVariant;
  submitLabel?: string;
  helperText?: string;
  className?: string;
}

const variantClasses: Record<CaptureFormVariant, string> = {
  hero: "grid gap-4",
  panel: "grid gap-4 md:grid-cols-[1fr_auto]",
  compact: "grid gap-3",
};

const actionClasses: Record<CaptureFormVariant, string> = {
  hero: "flex items-end sm:col-span-2",
  panel: "flex items-end",
  compact: "flex items-end",
};

const channelIcons: Record<PreferredChannel, React.ElementType> = {
  email: Mail,
  messenger: MessageCircle,
  preview: Bot,
};

export default function CaptureForm({
  source,
  variant = "hero",
  submitLabel = "Get My Daily Miracle",
  helperText,
  className = "",
}: CaptureFormProps) {
  const [preferredChannel, setPreferredChannel] =
    useState<PreferredChannel>(DEFAULT_CHANNEL);
  const { beginHandoff } = useLandingCapture();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    beginHandoff({
      preferredChannel,
      source,
    });

    if (preferredChannel === "preview") {
      openMiracleChat();
      return;
    }

    window.location.assign(buildHandoffUrl(preferredChannel));
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={variantClasses[variant]}>
        <fieldset className="flex flex-col gap-2 sm:col-span-2 md:col-span-full">
          <legend className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/58">
            Preferred channel
          </legend>
          <div className="grid grid-cols-1 gap-2 rounded-[24px] border border-white/10 bg-brand-dark-brown/42 p-1.5 sm:grid-cols-3">
            {CHANNEL_OPTIONS.map((option) => {
              const Icon = channelIcons[option.value];
              const isActive = preferredChannel === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setPreferredChannel(option.value);
                    if (option.value === "preview") {
                      beginHandoff({
                        preferredChannel: option.value,
                        source,
                      });
                      openMiracleChat();
                    }
                  }}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-[18px] px-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-brand-gold text-white shadow-[0_12px_26px_rgba(196,131,42,0.26)]"
                      : "text-white/62 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className={actionClasses[variant]}>
          <button
            id={source === "hero" ? "hero-submit" : undefined}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(135deg,#DCA251_0%,#C4832A_100%)] px-6 py-4 font-bold text-white shadow-[0_18px_40px_rgba(196,131,42,0.28)] transition-all hover:translate-y-[-1px] hover:shadow-[0_22px_50px_rgba(196,131,42,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>{submitLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {helperText ? (
        <p className="mt-4 text-sm leading-relaxed text-white/58">{helperText}</p>
      ) : null}

    </div>
  );
}
