"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { subscribeToMiracle } from "@/app/actions/miracle";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const FinalCTA = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        try {
            const result = await subscribeToMiracle(email);
            if (result.success) {
                setStatus("success");
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("CTA Error:", error);
            setStatus("error");
            setErrorMessage("Connection error. Try checking your internet.");
        }
    };

    if (status === "success") {
        return (
            <section id="final-cta" className="py-32 bg-background-cream relative overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto px-6 text-center relative z-10"
                >
                    <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-brand-gold" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-brand-brown leading-tight mb-8">
                        See you <span className="italic text-brand-gold">tomorrow!</span>
                    </h2>
                    <p className="text-brand-brown/60 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                        Your first daily miracle is set to arrive tomorrow morning at 6:00 AM. Check your inbox (and maybe spam) to make sure you&apos;re ready.
                    </p>
                    <button 
                        onClick={() => setStatus("idle")}
                        className="text-brand-gold font-bold hover:underline"
                    >
                        Sign up another email
                    </button>
                </motion.div>
            </section>
        );
    }

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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input 
                            type="email" 
                            required
                            placeholder="Your email address..." 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "submitting"}
                            className="flex-1 bg-white border border-brand-brown/5 rounded-full px-8 py-4 focus:outline-none focus:border-brand-gold shadow-sm disabled:opacity-60"
                        />
                        <button 
                            type="submit"
                            disabled={status === "submitting"}
                            className="bg-brand-dark-brown text-white px-10 rounded-full font-bold hover:bg-brand-brown transition-all py-4 md:py-0 whitespace-nowrap min-w-[200px] flex items-center justify-center gap-2"
                        >
                            {status === "submitting" ? (
                                <>
                                    Joining... <Loader2 size={18} className="animate-spin" />
                                </>
                            ) : (
                                "Get My Miracle"
                            )}
                        </button>
                    </div>
                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-500 text-sm justify-center mt-2">
                            <AlertCircle size={16} />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </form>
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

