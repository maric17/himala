"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CaptureForm from "@/components/landing/CaptureForm";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-brown px-4 pb-20 pt-32 sm:px-6">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_miracle_banner.png"
          alt="Himala Every Day Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-36"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,14,0.3)_0%,rgba(26,18,14,0.62)_42%,rgba(26,18,14,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,162,81,0.14),transparent_30%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-10 mix-blend-overlay" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-brown/42 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Daily miracles. Free forever.
            </span>
          </div>

          <h1 className="text-5xl leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            A small <span className="font-serif italic text-brand-gold">miracle</span>,
            <br />
            every morning.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/68 md:text-xl">
            Life gets noisy fast. Himala Every Day sends one short reflection to
            your inbox each morning so your day starts lighter, steadier, and a
            little more hopeful.
          </p>

          <div className="mt-10 grid gap-4 text-sm text-white/56 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
              3-minute daily read
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
              Tagalog and English
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
              No app required to start
            </div>
          </div>
        </motion.div>

        <motion.div
          id="daily-miracle-capture"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="rounded-[34px] border border-white/10 bg-white/8 p-5 shadow-[0_30px_70px_rgba(18,10,8,0.22)] backdrop-blur-2xl sm:p-6"
        >
          <div className="rounded-[28px] border border-white/10 bg-brand-dark-brown/38 p-5 sm:p-6">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.26em] text-brand-gold/88">
              Start here
            </p>
            <h2 className="max-w-md text-3xl font-serif leading-tight text-white">
              Choose where to sign up and we&apos;ll take you straight there.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/58">
              Tap once to continue through Jesus.net or Messenger.
            </p>

            <CaptureForm
              source="hero"
              submitLabel="Get My Daily Miracle"
              helperText="You will continue directly to the sign-up destination you choose."
              className="mt-6"
            />
          </div>

          <a
            href="#read-now"
            className="mt-4 inline-flex items-center text-sm font-semibold text-white/72 transition-colors hover:text-white"
          >
            Not ready yet? Read one first.
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
