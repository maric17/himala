"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * HumansBehind Section
 * Displays the mission-driven individuals behind the daily messages.
 */

const HumansBehind = () => {
    return (
        <section className="py-32 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-[1px] bg-brand-gold"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">The humans behind it</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-4">
                        Not gurus. Not influencers.<br />Just real people.
                    </h2>
                    <p className="text-brand-brown/50 mb-16 max-w-xl leading-relaxed">
                        They&apos;ve known burnout, heartbreak, and doubt. That&apos;s exactly why their words hit different.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-[32px] p-10 flex flex-col md:flex-row gap-8 shadow-sm border border-brand-brown/5"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                            <Image 
                                src="/images/churches/Yen-Writer.webp" 
                                alt="Yen Cabag" 
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex flex-col mb-4">
                                <span className="text-xl font-bold text-brand-brown">Yen Cabag</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Daily Writer</span>
                            </div>
                            <p className="text-brand-brown/60 text-sm leading-relaxed">
                                Homeschooling mom, writer, entrepreneur. Lives a quiet life in the mountains surrounded by books, her crochet, and her family. Believes the simplest life is already a miracle.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white rounded-[32px] p-10 flex flex-col md:flex-row gap-8 shadow-sm border border-brand-brown/5"
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                             <Image 
                                src="/images/churches/mark-Writer.webp" 
                                alt="Mark Cabag" 
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex flex-col mb-4">
                                <span className="text-xl font-bold text-brand-brown">Mark Cabag</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Daily Writer</span>
                            </div>
                            <p className="text-brand-brown/60 text-sm leading-relaxed">
                                Drummer, trail runner, adoptive father of two. Dreams of a Philippines where every kid has a family. Writes because he believes listening is where every miracle starts.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HumansBehind;
