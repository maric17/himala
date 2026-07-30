"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = React.useState(false);

  return (
    <footer className="relative">
      <div className="border-t border-brand-brown/5 bg-[#EFDDD0] py-6 text-center">
        <p className="text-sm font-medium text-brand-brown/70">
          Want your daily miracle in another language?{" "}
          <button
            type="button"
            onClick={() => setIsLanguageModalOpen(true)}
            className="font-bold text-brand-gold hover:underline"
          >
            See all 25+ languages {"->"}
          </button>
        </p>
      </div>

      <div className="bg-brand-dark-brown px-6 py-24 text-white/40 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
            <div className="col-span-1 md:col-span-12 lg:col-span-6">
              <h3 className="mb-8 font-serif text-3xl text-white">
                Jesus.Net Philippines and
                <br />
                Nyxsys Philippines, Inc.
              </h3>
              <p className="mb-8 max-w-lg leading-relaxed text-white/40">
                Bringing daily miracles to Filipinos through stories, wisdom,
                and community. Part of the global Jesus.Net family and in
                strong partnership with{" "}
                <a
                  href="https://nyxsys.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:underline"
                >
                  nyxsys.ph
                </a>
                . To God be the glory.
              </p>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-3">
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                Explore
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://ph.jesus.net/films-and-series"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    Films & Series
                  </a>
                </li>
                <li>
                  <a
                    href="https://ph.jesus.net/the-chosen"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    The Chosen
                  </a>
                </li>
                <li>
                  <a
                    href="https://myjourney.ph.jesus.net/"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    My Journey
                  </a>
                </li>
                <li>
                  <a
                    href="https://ph.jesus.net/a-miracle-every-day"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    A Miracle Every Day
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-3">
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                Help
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://ph.jesus.net/contact"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://ph.jesus.net/privacy"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="https://ph.jesus.net/cookies"
                    className="text-sm transition-colors hover:text-brand-gold"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 border-t border-white/5 pt-12 md:grid md:grid-cols-2">
            <div className="order-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 md:order-1 md:text-left">
              (c) 2026 ph.Jesus.net • A{" "}
              <span className="text-brand-gold">WebNL</span> site
            </div>

            <div className="order-1 flex items-center gap-4 md:order-2 md:justify-self-end">
              <a
                href="https://www.facebook.com/Jesus.netPH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-brand-gold"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/jesus.net_ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-brand-gold"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@ThelifeofJesus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-brand-gold"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@jesus.net_ph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-brand-gold"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLanguageModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setIsLanguageModalOpen(false)}
              className="absolute inset-0 bg-brand-dark-brown/80 backdrop-blur-md"
              aria-label="Close language options"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              className="relative w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                Other languages
              </p>
              <h3 className="mb-4 text-3xl font-serif leading-tight text-brand-brown">
                More language options are available across the Jesus.net network.
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-brand-brown/65">
                We are still confirming the best direct language directory for
                Himala Every Day. In the meantime, you can explore the broader
                Jesus.net experience or continue in the Philippine flow.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://www.jesus.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[24px] border border-brand-brown/10 bg-background-cream px-5 py-4 font-semibold text-brand-brown transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  Explore Jesus.net
                </a>
                <a
                  href="https://ph.jesus.net/a-miracle-every-day"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[24px] bg-brand-dark-brown px-5 py-4 font-semibold text-white transition-colors hover:bg-brand-brown"
                >
                  Stay in Philippines
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(false)}
                className="mt-6 text-sm font-medium text-brand-brown/55 hover:text-brand-brown"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
