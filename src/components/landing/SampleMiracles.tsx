"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MiracleShareButton from "@/components/landing/MiracleShareButton";
import { useLandingCapture } from "@/components/landing/CaptureProvider";
import { toSampleMiraclePreviews } from "@/lib/miracle-card-adapters";
import { miracleContent } from "@/lib/miracle-content";
import type { JesusNetMiracleCard } from "@/lib/jesusnet-miracles";
import type { SampleMiraclePreview } from "@/lib/miracle-card-adapters";

type SampleMiraclesProps = {
    cards?: JesusNetMiracleCard[];
};

const SampleMiracles = ({ cards = [] }: SampleMiraclesProps) => {
    const { scrollToPrimaryCapture } = useLandingCapture();
    const sampleMiracles: SampleMiraclePreview[] =
        cards.length > 0 ? toSampleMiraclePreviews(cards) : miracleContent;

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
                    {sampleMiracles.map((miracle, i) => (
                        <motion.article
                            key={miracle.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="group overflow-hidden rounded-[40px] border border-brand-brown/5 bg-white shadow-sm transition-all hover:shadow-2xl"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <Image 
                                    src={miracle.image}
                                    alt={miracle.title}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-brand-dark-brown/40"></div>
                                
                            </div>
                            <div className="p-8">
                                <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors italic leading-relaxed text-brand-dark-brown">{miracle.title}</h3>
                                <p className="text-sm text-brand-brown/50 leading-relaxed mb-8 italic">{miracle.excerpt}</p>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={miracle.originalUrl}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:gap-4"
                                    >
                                        Read this miracle <ArrowRight size={14} />
                                    </a>
                                    <MiracleShareButton
                                        miracleId={miracle.id}
                                        title={miracle.title}
                                        text={miracle.shareText}
                                        shareUrl={miracle.shareUrl}
                                    />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <a 
                        href="https://ph.jesus.net/miracles"
                        rel="noopener noreferrer"
                        className="bg-brand-dark-brown text-white px-10 py-5 rounded-full font-bold hover:bg-brand-brown transition-all flex items-center gap-4 group shadow-xl"
                    >
                        Browse All 3,000+ Miracles <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button
                        type="button"
                        onClick={() => scrollToPrimaryCapture("sample_miracles")}
                        className="rounded-full border border-brand-brown/10 bg-white px-8 py-5 font-bold text-brand-brown transition-colors hover:border-brand-gold hover:text-brand-gold"
                    >
                        Subscribe After This
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default SampleMiracles;
