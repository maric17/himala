"use client";

import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="w-8 h-[1px] bg-brand-gold"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">How it works</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-4">
                        Three steps. One minute. Zero cost.
                    </h2>
                    <p className="text-brand-brown/50 mb-20">No app required. No long forms. No credit card.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-brand-brown/5 hidden md:block z-0"></div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-card-gold text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">1</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Drop Your Email</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Just your email address. Choose Tagalog, Taglish, or English. That&apos;s literally it.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-card-green text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">2</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Wake Up to a Miracle</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Every morning, a new miracle lands in your inbox. Short, meaningful, and surprisingly relevant.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-card-red text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">3</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Feel the Shift</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Not overnight. But slowly, something changes. The day feels lighter. People notice. You notice.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

