"use client";

import React, { FormEvent, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLandingCapture } from "@/components/landing/CaptureProvider";
import {
  DEFAULT_LANGUAGE,
  isValidEmail,
  LANGUAGE_OPTIONS,
} from "@/lib/handoff";

type CaptureFormVariant = "hero" | "panel" | "compact";

interface CaptureFormProps {
  source: string;
  variant?: CaptureFormVariant;
  submitLabel?: string;
  helperText?: string;
  className?: string;
}

const variantClasses: Record<CaptureFormVariant, string> = {
  hero: "grid gap-4 lg:grid-cols-[1.3fr_0.75fr_auto]",
  panel: "grid gap-4 md:grid-cols-[1.2fr_0.8fr_auto]",
  compact: "grid gap-3",
};

export default function CaptureForm({
  source,
  variant = "hero",
  submitLabel = "Get My Daily Miracle",
  helperText,
  className = "",
}: CaptureFormProps) {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [error, setError] = useState("");
  const { beginHandoff } = useLandingCapture();
  const emailId = useId();
  const languageId = useId();
  const resolvedEmailId = source === "hero" ? "hero-email" : emailId;
  const resolvedLanguageId =
    source === "hero" ? "hero-language" : languageId;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setError(
        language === "tl"
          ? "Maglagay ng valid na email address para maipagpatuloy natin."
          : "Please enter a valid email address so we can continue."
      );
      return;
    }

    setError("");
    beginHandoff({
      email: trimmedEmail,
      language,
      source,
    });
  };

  const inputClasses =
    "w-full rounded-[22px] border border-white/12 bg-brand-dark-brown/65 px-5 py-4 text-white outline-none transition-all placeholder:text-white/28 focus:border-brand-gold/45 focus:ring-2 focus:ring-brand-gold/18";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={variantClasses[variant]}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={resolvedEmailId}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/58"
          >
            Email address
          </label>
          <input
            id={resolvedEmailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="name@example.com"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={resolvedLanguageId}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/58"
          >
            Language
          </label>
          <select
            id={resolvedLanguageId}
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className={inputClasses}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-[22px] bg-[linear-gradient(135deg,#DCA251_0%,#C4832A_100%)] px-6 py-4 font-bold text-white shadow-[0_18px_40px_rgba(196,131,42,0.28)] transition-all hover:translate-y-[-1px] hover:shadow-[0_22px_50px_rgba(196,131,42,0.35)] active:translate-y-0"
          >
            <span>{submitLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {helperText ? (
        <p className="mt-4 text-sm leading-relaxed text-white/58">{helperText}</p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-[20px] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
    </div>
  );
}
