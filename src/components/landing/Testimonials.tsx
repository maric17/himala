"use client";

import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
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
            text: "Reading Himala Everyday is like water in the desert. My life changed in ways I didn&apos;t expect. Parang gumaan ang lahat. I wish I found this sooner.",
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
            </div>
        </section>
    );
};

export default Testimonials;
