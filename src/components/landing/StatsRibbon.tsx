"use client";

import React from "react";
import { motion } from "framer-motion";

const StatsRibbon = () => {
  const stats = [
    { label: "Countries", value: "160+" },
    { label: "Languages", value: "25+" },
    { label: "Daily Read", value: "3 min" },
    { label: "Forever Free", value: "₱0" },
  ];

  return (
    <div className="bg-brand-dark-brown py-8 border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-around gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-3xl font-serif text-brand-gold mb-1">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsRibbon;

