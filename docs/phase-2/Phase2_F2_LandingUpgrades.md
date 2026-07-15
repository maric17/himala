# Module F2: Landing Page Upgrades — Technical Specification

This document specifies the structural copy upgrades, CTA optimization, a 3-step modern timeline, and FAQ accordion implementation for **F2: Landing Page Upgrades**.

---

## 🎯 Objective
Make the landing page visually premium, place primary CTAs above the fold on mobile, simplify the onboarding description, and address questions using a responsive FAQ.

With Payload CMS, editable landing content can later move out of code and into admin-managed collections. The static implementation remains valid as a fallback.

---

## 📁 Files to Create / Modify

1. **[NEW]** [FaqAccordion.tsx](file:///c:/RepoOutside/himala/src/components/landing/FaqAccordion.tsx) — Responsive FAQ Accordion block.
2. **[MODIFY]** [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx) — Optimize layouts to fit the input element above the fold.
3. **[MODIFY]** [HowItWorks.tsx](file:///c:/RepoOutside/himala/src/components/landing/HowItWorks.tsx) — Format as a 3-step visual narrative.
4. **[MODIFY]** `src/app/(frontend)/page.tsx` — Insert `FaqAccordion` above the footer.

---

## 🛠️ Step-by-Step Code Specifications

### 1. Above-the-Fold Optimization (`Hero.tsx`)
Currently, the hero content might push forms too far down. We will adjust heights, padding, and layout structure using Tailwind CSS v4 variables:

* **Markup Structure**: Place the `<form>` element directly below the subhead so that on screens smaller than `md`, it is visible without scrolling.
* **Tailwind v4 Classes**: Ensure form wrapper has class `flex flex-col sm:flex-row gap-2 max-w-xl mx-auto w-full mt-6 px-4`.
* **Subtle Animation**: Apply Framer Motion slide-up animations (`y: [20, 0], opacity: [0, 1]`) with stagger to keep the UI entrance elegant and premium.

---

### 2. 3-Step Dynamic Onboarding (`HowItWorks.tsx`)
Redesign the file `src/components/landing/HowItWorks.tsx` to showcase the 3 clear steps using absolute timeline connectors:

```tsx
"use client";

import React from "react";
import { MessageCircle, Heart, FlameKindling } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Sabihin ang iyong nararamdaman",
    titleEn: "1. Share how you feel",
    desc: "Kausapin si Miracle tungkol sa lungkot, takot, o pasasalamat na dala mo ngayon.",
    descEn: "Share any heavy or hopeful feelings you carry with Miracle in confidence.",
  },
  {
    icon: Heart,
    title: "2. Tanggapin ang iyong Himala",
    titleEn: "2. Receive your Miracle",
    desc: "Makakatanggap ka ng espesyal na salita ng Diyos na isinulat para sa eksaktong damdamin mo.",
    descEn: "Receive a tailored promise from God's word curated specifically for your heart.",
  },
  {
    icon: FlameKindling,
    title: "3. Gawin itong Daily Habit",
    titleEn: "3. Make it Daily",
    desc: "Simulan ang bawat umaga nang may bagong pag-asa na ihahatid direkta sa iyo.",
    descEn: "Start every single morning anchored in hope, delivered straight to your inbox.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background-cream text-brand-brown">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center font-serif text-3xl md:text-4xl text-brand-dark-brown mb-12">
          Paano Ito Gumagana / How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-brand-gold/20 -z-10" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-brand-gold/10"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 shadow-inner">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark-brown mb-2">{step.title}</h3>
              <p className="text-xs text-brand-gold font-sans mb-3 tracking-wider uppercase font-semibold">{step.titleEn}</p>
              <p className="text-sm text-brand-brown/80 mb-1">{step.desc}</p>
              <p className="text-xs text-brand-brown/60 italic font-sans">{step.descEn}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 3. FAQ Accordion (`FaqAccordion.tsx`)
Create a responsive React State accordion inside `src/components/landing/FaqAccordion.tsx`:

* **Key FAQ Content**:
  1. *Q: Libre ba talaga ito? (Is it free?)* -> A: Opo! Ito ay 100% libreng handog mula sa Jesus.Net.
  2. *Q: Gaano kadalas ito ipinapadala? (How often is it sent?)* -> A: Makakakuha ka ng isang maikling miracle text/email tuwing umaga.
  3. *Q: Pwede ba akong huminto? (Can I stop anytime?)* -> A: Opo, may "unsubscribe" link sa bawat dulo ng email o message.
* **Component Design**: Build dynamic panels that expand dynamically with Framer Motion `height` transitions (`initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}`) for ultimate premium feel.

---

## 🧪 Manual Verification Instructions
1. Shrink browser to Chrome DevTools **iPhone 12 Pro** simulation.
2. Verify that the Hero text, email field, and primary button fit completely within the vertical bounds of the 844px high layout without initial scrolling.
3. Scroll down and verify that the 3-step cards and FAQs expand/collapse with fluid ease.

## Payload CMS Integration

Recommended Payload-managed content:

- Hero eyebrow, headline, body, helper text, and CTA labels.
- FAQ entries and ordering.
- How-it-works step titles, descriptions, and icons.
- Testimonials and trust stats.
- Language-specific copy variants.
- Landing-page experiments and CTA variants.

Recommended collections:

- `settings`
- `faqs`
- `testimonials`
- `landingSections`
- `events`
