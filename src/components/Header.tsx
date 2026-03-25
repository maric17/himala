"use client";

import React from "react";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full absolute top-0 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark-brown">
          <Plus size={18} />
        </div>
        <span className="font-serif text-xl tracking-tight font-semibold text-white/90">Himala Everyday</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70 tracking-widest uppercase">
        <a href="#" className="hover:text-brand-gold transition-colors">Your Story</a>
        <a href="#" className="hover:text-brand-gold transition-colors">Ano Ito?</a>
        <a href="#" className="hover:text-brand-gold transition-colors">Real Talk</a>
        <a href="#" className="hover:text-brand-gold transition-colors">Read Now</a>
      </div>
      
      <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
        Get Your Miracle
      </button>
    </nav>
  );
};

export default Header;
