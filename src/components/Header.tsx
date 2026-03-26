"use client";

import React from "react";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full absolute top-0 left-1/2 -translate-x-1/2 z-50">
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark-brown group-hover:scale-110 transition-transform">
          <Plus size={18} />
        </div>
        <span className="font-serif text-xl tracking-tight font-semibold text-white/90 group-hover:text-brand-gold transition-colors">Himala Everyday</span>
      </a>
      
      <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold text-white/50 tracking-widest uppercase">
        <a href="https://jesus.net.ph/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Home</a>
        <a href="#your-story" className="hover:text-brand-gold transition-colors">Your Story</a>
        <a href="#what-is-it" className="hover:text-brand-gold transition-colors">Ano Ito?</a>
        <a href="#testimonials" className="hover:text-brand-gold transition-colors">Real Talk</a>
        <a href="#read-now" className="hover:text-brand-gold transition-colors">Read Now</a>
      </div>
      
      <a href="#final-cta" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full text-[11px] uppercase tracking-widest font-bold transition-all backdrop-blur-sm">
        Get Your Miracle
      </a>
    </nav>
  );
};

export default Header;
