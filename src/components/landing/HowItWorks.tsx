"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Sunrise } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Leave your email",
    body: "Start with one simple step. Choose your language and head into the subscribe flow without filling everything twice.",
    icon: Mail,
    color: "bg-card-gold",
  },
  {
    number: "02",
    title: "Wake up to a miracle",
    body: "Every morning, a short message lands in your inbox. Just enough truth, comfort, and perspective to steady the day ahead.",
    icon: Sunrise,
    color: "bg-card-green",
  },
  {
    number: "03",
    title: "Feel the shift",
    body: "Not with hype. Not all at once. Just a quiet, real change in how you carry the day, the pressure, and the next step.",
    icon: Sparkles,
    color: "bg-card-red",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              How it works
            </span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>
          <h2 className="text-5xl font-serif leading-tight text-brand-brown md:text-6xl">
            Three steps. One gentle routine. Zero pressure.
          </h2>
          <p className="mt-5 text-brand-brown/52">
            No app required. No long setup. Just one smoother path from curiosity
            to a daily rhythm of hope.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-3">
          <div className="absolute left-[16.66%] right-[16.66%] top-20 hidden h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/45 to-brand-gold/0 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.1 }}
                className="relative rounded-[34px] border border-brand-brown/8 bg-background-cream p-8 shadow-sm"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-brand-brown/34">
                    Step {step.number}
                  </span>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${step.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="max-w-xs text-3xl font-serif leading-tight text-brand-brown">
                  {step.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-brand-brown/58">
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
