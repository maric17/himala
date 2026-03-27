"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * SampleMiracles
 * A static grid featuring 3 top miracle stories to drive engagement before the final CTA.
 */

const miracles = [
    { 
        date: "MAR 26", 
        image: "/images/churches/11a2f2b0-b80c-49ef-9def-feb61d488095___media_library_original_420_675.webp", 
        title: "He's been thinking about YOU this whole time!", 
        text: "A reminder of God's constant presence and love for you.",
        link: "https://ph.jesus.net/miracles/hes-been-thinking-about-you-this-whole-time"
    },
    { 
        date: "MAR 25", 
        image: "/images/churches/36c813cf-8199-4d41-83f8-a98ce3d32589___media_library_original_420_675.webp", 
        title: "Alam mo ba ang mga sugat na tinanggap ni Jesus?", 
        text: "Reflecting on the sacrifice that changed everything.",
        link: "https://ph.jesus.net/miracles/alam-mo-ba-ang-mga-sugat-na-tinanggap-ni-jesus"
    },
    { 
        date: "MAR 24", 
        image: "/images/churches/354f496c-4b8d-46aa-b832-81a5feeba8d4___media_library_original_420_675.webp", 
        title: "Alam mo ba ang pinagdaanan ni Jesus?", 
        text: "A journey through the path that leads to hope.",
        link: "https://ph.jesus.net/miracles/alam-mo-ba-ang-pinagdaanan-ni-jesus"
    }
];

const SampleMiracles = () => {
    return (
        <section id="read-now" className="py-24 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-[1px] bg-brand-gold"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Read one now</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-brown leading-tight mb-4">
                        Try it before you subscribe.<br />No signup needed.
                    </h2>
                    <p className="text-brand-brown/50 mb-16 text-sm">Not sure yet? Good. Just read one. See if something clicks.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {miracles.map((miracle, i) => (
                        <motion.a 
                            key={i} 
                            href={miracle.link}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-brand-brown/5 group cursor-pointer hover:shadow-2xl transition-all"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <Image 
                                    src={miracle.image}
                                    alt={miracle.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-brand-dark-brown/40"></div>
                                
                            </div>
                            <div className="p-8">
                                <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors italic leading-relaxed text-brand-dark-brown">{miracle.title}</h3>
                                <p className="text-sm text-brand-brown/50 leading-relaxed mb-8 italic">{miracle.text}</p>
                                <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                                    Read this miracle <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-20 flex justify-center"
                >
                    <a 
                        href="https://ph.jesus.net/miracles"
                        rel="noopener noreferrer"
                        className="bg-brand-dark-brown text-white px-10 py-5 rounded-full font-bold hover:bg-brand-brown transition-all flex items-center gap-4 group shadow-xl"
                    >
                        Browse All 3,000+ Miracles <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default SampleMiracles;


