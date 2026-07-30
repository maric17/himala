"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLandingCapture } from "@/components/landing/CaptureProvider";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToPrimaryCapture } = useLandingCapture();

  useEffect(() => {
    const onScroll = () => {
      const shouldShow =
        window.innerWidth < 1024 && window.scrollY > window.innerHeight * 0.55;

      setIsVisible(shouldShow);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed inset-x-0 bottom-0 z-[90] p-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-[26px] border border-white/14 bg-brand-dark-brown/92 px-4 py-4 shadow-[0_24px_55px_rgba(20,12,9,0.36)] backdrop-blur-xl">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold/85">
                Daily miracle
              </p>
              <p className="truncate text-sm text-white/78">
                Start with one short email each morning.
              </p>
            </div>

            <button
              type="button"
              onClick={() => scrollToPrimaryCapture("sticky_cta")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c98c38]"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
