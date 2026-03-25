"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Globe2, Languages, Users2 } from "lucide-react";

// A sleek futuristic number counter component
const Counter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const STATS = [
  {
    icon: Globe2,
    value: 130,
    suffix: "+",
    label: "Countries Reached",
    description: "Impacting lives across continents globally.",
  },
  {
    icon: Languages,
    value: 57,
    suffix: "",
    label: "Languages",
    description: "Translating hope into native tongues.",
  },
  {
    icon: Users2,
    value: 1,
    suffix: "B",
    label: "People Reached",
    description: "Total gospel presentations engaged online.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-brand-dark w-full text-white relative overflow-hidden border-t border-white/5">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle cx="512" cy="512" r="512" fill="url(#brand-gradient)" fillOpacity="0.15" />
          <defs>
            <radialGradient id="brand-gradient">
              <stop stopColor="var(--color-brand-red)" />
              <stop offset="1" stopColor="var(--color-brand-dark)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-yellow text-xs font-semibold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              About Our Network
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              What is <span className="text-brand-yellow">Jesus.Net?</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
              <p>
                Jesus.Net is a global ministry dedicated to bringing the message of Jesus to the digital world. With offices across the globe, we create free tools and platforms that help people encounter Jesus wherever they are.
              </p>
              <p className="pl-6 border-l-2 border-brand-yellow/50 text-white/90 font-normal">
                In the Philippines, we believe that everyone can be a digital missionary. You don&apos;t need a stage to make disciples—just two Ws, <span className="text-brand-yellow font-semibold">willingness</span> and <span className="text-brand-yellow font-semibold">WiFi</span>.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Global Reach Infographic */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              // Make the "People Reached" stat span the full width on sm screens to act as a hero stat
              const isLarge = index === 2;
              
              return (
                <FadeIn 
                  key={stat.label}
                  direction="up" 
                  delay={0.2 + (index * 0.1)}
                  duration={0.8}
                  className={isLarge ? "sm:col-span-2" : ""}
                >
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative group h-full rounded-2xl bg-white/5 border border-white/10 p-8 overflow-hidden backdrop-blur-sm"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-colors duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-brand-black/50 rounded-xl text-brand-yellow ring-1 ring-white/10 group-hover:ring-brand-yellow/30 transition-all">
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-semibold tracking-wider text-white/50 uppercase">
                          {stat.label}
                        </p>
                      </div>
                      
                      <div className="mb-2">
                        <h3 className="text-5xl font-light text-white group-hover:text-brand-yellow transition-colors duration-300">
                          <Counter value={stat.value} suffix={stat.suffix} duration={2.5} />
                        </h3>
                      </div>
                      
                      <p className="text-white/40 text-sm font-light">
                        {stat.description}
                      </p>
                    </div>

                    {/* Decorative node effect inside the card */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-yellow/10 blur-2xl rounded-full group-hover:bg-brand-yellow/20 transition-all duration-700" />
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
