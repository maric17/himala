"use client";

import React from "react";
import { Plus } from "lucide-react";

/**
 * Footer component for Himala Everyday.
 * Includes a newsletter signup and site links.
 */

const Footer = () => {
  return (
    <footer className="bg-brand-brown py-32 px-6 text-white text-center">
      <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark-brown mx-auto mb-12">
        <Plus size={32} />
      </div>
      <h2 className="text-5xl font-serif mb-12">Join 1 million subscribers.</h2>
      <div className="max-w-md mx-auto relative mb-20">
          <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-lg focus:outline-none focus:border-brand-gold transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-brand-gold text-brand-dark-brown px-8 rounded-full font-bold hover:bg-white transition-all">
              Subscribe
          </button>
      </div>
      
      <div className="flex flex-wrap justify-center gap-12 text-sm text-white/40 font-medium uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          <a href="#" className="hover:text-white transition-colors">Our Story</a>
      </div>
      
      <div className="mt-20 text-white/20 text-xs">
          © 2026 Himala Everyday. Part of the Jesus.net family.
      </div>
    </footer>
  );
};

export default Footer;
