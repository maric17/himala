"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Pen, ShieldCheck } from "lucide-react";

/**
 * DailyMiracleInfo Section
 * A detailed breakdown of the service with a high-fidelity card visualization.
 */

const DailyMiracleInfo = () => {
  return (
    <section id="what-is-it" className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      {/* Left side: The Visual Card */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative pt-20"
      >
        {/* Soft shadow background */}
        <div className="absolute top-0 left-10 right-10 bottom-10 bg-brand-brown/5 blur-3xl rounded-full -z-10"></div>
        
        {/* The Card Container */}
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-white border border-brand-brown/5 max-w-md mx-auto">
          {/* Gold Header Section */}
          <div className="bg-[#C18C3E] h-48 p-10">
             <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2 block">Today&apos;s Miracle</span>
             <h4 className="text-white font-serif text-2xl">Himala Every Day</h4>
          </div>

          {/* White Overlapping Content Card */}
          <div className="relative -mt-24 mx-2 mb-2 bg-white rounded-[32px] p-10 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown/30 mb-8">March 23, 2026 • 3 Min Read</div>
            
            <p className="text-xl md:text-2xl font-serif text-brand-brown leading-relaxed italic mb-4">
              &quot;You are not behind. You are not lost. You are exactly where your next chapter begins.&quot;
            </p>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C18C3E] mb-10 block">— Today&apos;s Miracle</span>

            <p className="text-brand-brown/70 leading-relaxed mb-10 text-sm md:text-base">
              Even when everything feels scarce — money, energy, direction — there&apos;s something bigger than the lack. Something that whispers, <span className="bg-[#F8F0E3] px-1 font-medium text-brand-brown">&quot;I&apos;ve got you.</span> <span className="bg-[#F8F0E3] px-1 font-medium text-brand-brown">You won&apos;t run out.&quot;</span> That voice? It shows up every morning in your inbox.
            </p>

            {/* Author Footer */}
            <div className="flex items-center gap-4 pt-8 border-t border-brand-brown/5">
              <div className="w-10 h-10 rounded-full bg-brand-brown/10 flex items-center justify-center text-brand-brown/60 text-xs font-bold shrink-0">Y</div>
              <div>
                <div className="text-sm font-bold text-brand-brown">Yen Cabag</div>
                <div className="text-[10px] text-brand-brown/40 uppercase tracking-widest font-bold">Daily Writer</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Right side: Information */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-brand-gold"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">What is this?</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-brown leading-tight mb-8">
          Think of it as a daily <i className="italic text-brand-gold">miracle</i> in your inbox.
        </h2>
        <p className="text-brand-brown/60 text-lg mb-12 leading-relaxed max-w-xl">
          Himala Every Day is a free daily message — part reflection, part wisdom, part pep talk — that arrives in your inbox every morning. Think of it as that friend who always knows what to say.
        </p>
        
        <div className="space-y-10">
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#C18C3E] flex items-center justify-center shrink-0 shadow-lg shadow-brand-gold/20">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">3 minutes. That&apos;s it.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">Shorter than your morning scroll. Deeper than any motivational quote on IG.</p>
            </div>
          </div>
          
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#6B8E8E] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/10">
              <Pen className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">Written by humans who&apos;ve been there.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">Not AI. Not generic. Real people who&apos;ve walked through the same mess — and found something worth sharing.</p>
            </div>
          </div>
          
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#8E7B8E] flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/10">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">Free. No catch. No upsell.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">No premium tier. No &quot;unlock more.&quot; Just daily miracles, completely free, forever.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <a 
            href="#final-cta"
            className="inline-flex bg-brand-gold hover:bg-brand-gold/90 text-white px-10 py-5 rounded-full font-bold items-center gap-3 transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,162,81,0.2)]"
          >
            Get Your Daily Miracle <ArrowRight size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default DailyMiracleInfo;

