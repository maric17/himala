"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const feedItems = [
  "Someone in Quezon City just opened today's miracle",
  "A new reader in Davao signed up this morning",
  "Someone in Cebu shared a miracle with a friend",
  "A family in Bacolod started the day with a read",
  "A reader in Iloilo came back for today's message",
  "Someone in Cagayan de Oro saved a miracle to revisit later",
  "A new subscriber in Baguio joined before breakfast",
  "A reader in General Santos opened today's reflection",
];

export default function LiveFeed() {
  const [dailyReads, setDailyReads] = useState(12480);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDailyReads((current) => current + Math.floor(Math.random() * 4 + 1));
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative z-20 -mt-14 px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-brand-brown/8 bg-white/82 shadow-[0_24px_60px_rgba(30,18,14,0.1)] backdrop-blur-xl">
        <div className="grid gap-6 px-5 py-5 md:grid-cols-[0.95fr_1.65fr] md:px-8 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[26px] bg-brand-dark-brown px-5 py-5 text-white"
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold/85">
              Live miracle feed
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-serif text-brand-gold sm:text-5xl">
                {dailyReads.toLocaleString()}
              </span>
              <span className="pb-1 text-xs font-bold uppercase tracking-[0.24em] text-white/48">
                reads today
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">
              Gentle social proof from readers around the Philippines, refreshed
              throughout the day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-[26px] border border-brand-brown/8 bg-[#F6E9DA]"
          >
            <div className="border-b border-brand-brown/8 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-brand-brown/48">
                Activity across the Philippines
              </p>
            </div>

            <div className="overflow-hidden py-5">
              <div className="animate-feed flex min-w-max gap-4 px-5">
                {[...feedItems, ...feedItems].map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-3 rounded-full border border-brand-brown/8 bg-white px-4 py-3 text-sm text-brand-brown/78 shadow-sm"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-gold shadow-[0_0_0_6px_rgba(220,162,81,0.14)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
