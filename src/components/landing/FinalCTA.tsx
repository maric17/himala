"use client";

import React from "react";
import { motion } from "framer-motion";

const FinalCTA = () => {
    return (
        <section id="final-cta" className="py-32 bg-background-cream relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto px-6 text-center relative z-10"
            >
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Your first miracle</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-brand-brown leading-tight mb-12">
                    Tomorrow morning,<br />a <span className="italic text-brand-gold">miracle</span> is waiting in your inbox.
                </h2>
                <p className="text-brand-brown/60 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
                    One email. That&apos;s the only thing between you and a daily reminder that life can be lighter. It&apos;s free. It&apos;s short. And somehow, it works.
                </p>

                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8">
                    <input 
                        type="email" 
                        placeholder="Your email address..." 
                        className="flex-1 bg-white border border-brand-brown/5 rounded-full px-8 py-4 focus:outline-none focus:border-brand-gold shadow-sm"
                    />
                    <button className="bg-brand-dark-brown text-white px-10 rounded-full font-bold hover:bg-brand-brown transition-all py-4 md:py-0 whitespace-nowrap">
                        Get My Miracle
                    </button>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/30">
                    Free forever. Unsubscribe anytime. We don&apos;t do spam — only miracles.
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.05, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 right-0 w-64 h-64 bg-card-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            ></motion.div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.05, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-card-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
            ></motion.div>
        </section>
    );
};

export default FinalCTA;

