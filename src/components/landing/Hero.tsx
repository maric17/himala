"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Himala Everyday Hero Section
 * Features a high-fidelity background banner and the two-button primary CTA.
 */

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-40 pb-20 bg-brand-brown overflow-hidden">
      {/* High-Fidelity Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero_miracle_banner.png" 
          alt="Himala Everyday Background" 
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/80 to-brand-brown/40"></div>
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto z-10 relative"
      >
        <div className="inline-flex items-center gap-2 border border-brand-gold/30 bg-brand-brown/40 backdrop-blur-sm rounded-full px-4 py-1 mb-12">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1">
            <span className="text-xs">✧</span> Daily Miracles • Free Forever
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-8">
          A small <i className="font-serif italic text-brand-gold">miracle</i>,<br />
          delivered every morning.
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-light">
          Life is heavy sometimes. The overthinking, the pressure, the &quot;what now?&quot; — we get it. Himala Everyday is a short, free daily message that somehow makes the day feel lighter.
        </p>

        {/* Two Button CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#final-cta"
            className="group bg-brand-gold hover:bg-brand-gold/90 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,162,81,0.2)]"
          >
            Get Your Daily Miracle <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#read-now"
            className="border border-white/20 hover:border-brand-gold text-white/80 hover:text-white px-10 py-5 rounded-full font-bold transition-all"
          >
            See What It&apos;s Like
          </a>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent"></div>
      </motion.div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] mix-blend-overlay z-0"></div>
    </section>
  );
};

export default Hero;


