"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLandingCapture } from "@/components/landing/CaptureProvider";

const Testimonials = () => {
    const { scrollToPrimaryCapture } = useLandingCapture();
    const reviews = [
        {
            tag: "WAS BURNED OUT",
            text: "Parang may kumakausap sa&apos;kin tuwing umaga bago ako lunurin ng anxiety. Ang simple lang — pero it changed how I start my day. Hindi ko inexpect yun.",
            author: "Maria, Cebu",
            tagColor: "text-red-500 bg-red-50"
        },
        {
            tag: "WAS HOLDING GRUDGES",
            text: "I found the strength to forgive people I thought I&apos;d hate forever. I turned the page — literally and figuratively. I can do things I never thought I could.",
            author: "James, Manila",
            tagColor: "text-green-600 bg-green-50"
        },
        {
            tag: "WAS STARTING OVER",
            text: "Reading Himala Every Day is like water in the desert. My life changed in ways I didn&apos;t expect. Parang gumaan ang lahat. I wish I found this sooner.",
            author: "Paolo, Baguio",
            tagColor: "text-purple-600 bg-purple-50"
        }
    ];

    return (
        <section id="testimonials" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="w-8 h-[1px] bg-brand-gold"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Real Talk</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-16">
                        Real people. Real moments.<br />Real changes.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="bg-background-cream p-12 rounded-[32px] text-left flex flex-col justify-between border border-brand-brown/5 shadow-sm"
                        >
                            <div>
                                <span className={`text-[10px] font-bold tracking-widest border border-brand-brown/5 px-4 py-1.5 rounded-full inline-block mb-10 ${review.tagColor}`}>{review.tag}</span>
                                <p className="text-brand-brown font-serif italic text-lg leading-relaxed mb-12">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-[1px] bg-brand-gold"></div>
                                <span className="text-sm font-bold text-brand-brown/60">— {review.author}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-12 rounded-[32px] bg-brand-dark-brown px-8 py-10 text-left text-white md:flex md:items-center md:justify-between md:gap-8"
                >
                    <div className="max-w-2xl">
                        <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-brand-gold/80 mb-3">
                            Ready for your own daily rhythm?
                        </p>
                        <h3 className="text-3xl font-serif leading-tight">
                            Start with one short miracle tomorrow morning.
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollToPrimaryCapture("testimonials")}
                        className="mt-6 inline-flex items-center gap-3 rounded-full bg-brand-gold px-6 py-4 font-bold text-white transition-all hover:translate-y-[-1px] md:mt-0"
                    >
                        Get My Daily Miracle
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
