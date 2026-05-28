"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly will I receive every day?",
    answer:
      "A short daily miracle by email. Think reflection, encouragement, and one clear reminder of hope you can carry into the rest of the day.",
  },
  {
    question: "Is this really free?",
    answer:
      "Yes. No payment wall, no premium upsell, and no hidden catch. You can subscribe and leave any time.",
  },
  {
    question: "How long does each miracle take to read?",
    answer:
      "Usually around three minutes. Short enough for busy mornings, substantial enough to stay with you.",
  },
  {
    question: "Can I choose Tagalog or English?",
    answer:
      "Yes. The capture flow lets you choose your preferred language before you continue to the subscribe form.",
  },
  {
    question: "Do I need to install an app first?",
    answer:
      "No. You can start with email right away. If you prefer, the app is also available later as an optional follow-up path.",
  },
  {
    question: "Will you spam me?",
    answer:
      "No. The experience is designed around one meaningful daily message, not a flood of promotional emails.",
  },
];

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState(0);

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              FAQ
            </span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>
          <h2 className="text-4xl font-serif leading-tight text-brand-brown md:text-5xl">
            Questions people usually ask before they say yes.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItem === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[28px] border border-brand-brown/8 bg-background-cream"
              >
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-brand-brown">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-gold transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-brand-brown/65">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
