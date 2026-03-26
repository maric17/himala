"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Himala Everyday App Section
 * Features direct links to App Store and Google Play plus a high-fidelity image mock-up.
 */

const TheApp = () => {
    return (
        <section className="bg-card-green relative overflow-hidden py-32">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-brand-gold"></div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">The app</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                            Take your daily miracle everywhere.
                        </h2>
                        <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-md">
                            No email? No problem. Download the app and get your miracle on your phone instead. Free on both platforms.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <a 
                                href="https://apps.apple.com/ca/app/a-miracle-every-day/id1668769557"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm group"
                            >
                                <span className="text-xs">Download on the</span>
                                <span className="font-bold">App Store</span>
                            </a>
                            <a 
                                href="https://play.google.com/store/apps/details?id=net.jesus.amed&hl=en_US"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm group"
                            >
                                <span className="text-xs">Get it on</span>
                                <span className="font-bold">Google Play</span>
                            </a>
                        </div>
                    </motion.div>


                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex justify-center md:justify-end py-12"
                    >
                        <div className="relative w-full max-w-md aspect-[4/5] md:translate-y-12">
                            {/* editorial border frame */}
                            <div className="absolute -inset-10 border border-white/20 rounded-[48px] -z-10 bg-white/5 backdrop-blur-sm shadow-inner transition-transform duration-700 group-hover:scale-105"></div>
                            
                            {/* secondary border for depth */}
                            <div className="absolute -inset-6 border border-brand-gold/10 rounded-[40px] -z-10 translate-x-4 translate-y-4"></div>

                            <Image 
                                src="/images/churches/Taglish-iPhone-on-Hand.png"
                                alt="Himala Everyday Mobile App"
                                fill
                                className="object-contain z-10"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TheApp;


