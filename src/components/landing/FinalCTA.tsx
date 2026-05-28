"use client";

import React from "react";
import { motion } from "framer-motion";
import CaptureForm from "@/components/landing/CaptureForm";

const FinalCTA = () => {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-background-cream py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-6"
      >
        <div className="rounded-[40px] bg-brand-dark-brown px-6 py-10 text-center shadow-[0_28px_70px_rgba(26,18,14,0.16)] sm:px-10 sm:py-12">
          <div className="mb-2 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Your first miracle
            </span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>

          <h2 className="mx-auto max-w-3xl text-5xl font-serif leading-tight text-white md:text-6xl">
            Tomorrow morning, a <span className="italic text-brand-gold">miracle</span>
            <br />
            can be waiting in your inbox.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
            One email. That&apos;s the only thing between you and a daily
            reminder that life can be lighter, steadier, and more hopeful.
          </p>

          <CaptureForm
            source="final_cta"
            variant="panel"
            submitLabel="Start My Daily Miracle"
            helperText="Free forever. Unsubscribe anytime. We do not do spam, only one daily miracle."
            className="mx-auto mt-10 max-w-3xl text-left"
          />
        </div>
      </motion.div>

      <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-card-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/2 rounded-full bg-card-red/10 blur-3xl" />
    </section>
  );
};

export default FinalCTA;
