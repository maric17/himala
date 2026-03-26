"use client";

import React from "react";
import { motion } from "framer-motion";

const marqueeText = [
  "No spam, ever", 
  "Read in 160+ countries", 
  "Available in 25+ languages", 
  "3-minute daily reads", 
  "100% free, no strings attached", 
  "Written by real people, not AI"
];

const Marquee = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-[#EFDDD0] py-4 overflow-hidden border-b border-brand-brown/10"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            {marqueeText.map((text, j) => (
              <div key={j} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-brown/70">{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Marquee;

