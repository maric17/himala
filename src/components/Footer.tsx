"use client";

import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

/**
 * Footer component for Himala Every Day.
 * Matching the high-fidelity design with language selection top bar,
 * multi-column links, and social bottom bar.
 */

const Footer = () => {
  return (
    <footer className="relative">
      {/* Top Banner - Language Selection */}
      <div className="bg-[#EFDDD0] py-6 text-center border-t border-brand-brown/5">
        <p className="text-brand-brown/70 text-sm font-medium">
          Want your daily miracle in another language?{" "}
          <a href="#" className="text-brand-gold font-bold hover:underline">
            See all 25+ languages →
          </a>
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="bg-brand-dark-brown text-white/40 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-12 lg:col-span-6">
              <h3 className="text-white font-serif text-3xl mb-8">Jesus.Net Philippines and<br></br> Nyxsys Philippines, Inc.</h3>
              <p className="text-white/40 leading-relaxed max-w-lg mb-8">
                Bringing daily miracles to Filipinos through stories, wisdom, and community. Part of the global Jesus.Net family and in strong partnership with <a href="https://nyxsys.ph/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">https://nyxsys.ph/</a>. To God be the glory!
              </p>
            </div>

            {/* Links Columns */}
            <div className="col-span-1 md:col-span-6 lg:col-span-3">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/20 mb-8">Explore</h4>
              <ul className="space-y-4">
                <li><a href="https://ph.jesus.net/films-and-series" className="text-sm hover:text-brand-gold transition-colors">Films & Series</a></li>
                <li><a href="https://ph.jesus.net/the-chosen" className="text-sm hover:text-brand-gold transition-colors">The Chosen</a></li>
                <li><a href="https://myjourney.ph.jesus.net/" className="text-sm hover:text-brand-gold transition-colors">My Journey</a></li>
                <li><a href="https://ph.jesus.net/a-miracle-every-day" className="text-sm hover:text-brand-gold transition-colors">A Miracle Every Day</a></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-3">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/20 mb-8">Help</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm hover:text-brand-gold transition-colors">Contact</a></li>
                <li><a href="https://ph.jesus.net/privacy" className="text-sm hover:text-brand-gold transition-colors">Privacy</a></li>
                <li><a href="https://ph.jesus.net/cookies" className="text-sm hover:text-brand-gold transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:grid md:grid-cols-2 items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 order-2 md:order-1 text-center md:text-left">
              © 2026 ph.Jesus.net • A <span className="text-brand-gold">WebNL</span> site
            </div>
            
            <div className="flex items-center gap-4 order-1 md:order-2 md:justify-self-end">
              <a href="https://www.facebook.com/Jesus.netPH" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-brand-gold transition-all text-white/40">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/jesus.net_ph/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-brand-gold transition-all text-white/40">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@ThelifeofJesus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-brand-gold transition-all text-white/40">
                <Youtube size={18} />
              </a>
              <a href="https://www.tiktok.com/@jesus.net_ph" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-brand-gold transition-all text-white/40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


