# Module F3: Live Miracle Feed — Technical Specification

This document specifies the exact visual logic, simulated ticker mechanics, and real-time state hooks for **F3: Live Miracle Feed**.

---

## 🎯 Objective
Establish high social proof and active community presence on the landing page by displaying a **simulated** ticker of reading events from different regions in the Philippines, paired with a gently incrementing daily read counter. **No external API is used — all data is seeded locally in the component using random selection from curated static arrays.** This keeps the page fast, offline-resilient, and zero-cost to operate.

With Payload CMS, the feed can remain simulated as a fallback while optionally showing admin-approved live-feed events, reader milestones, or referral activity from Payload.

---

## 📁 Files to Create / Modify

1. **[NEW]** [LiveFeed.tsx](file:///c:/RepoOutside/himala/src/components/landing/LiveFeed.tsx) — The dynamic ticker and counter bar.
2. **[MODIFY]** `src/app/(frontend)/page.tsx` — Integrate the feed block directly beneath the Hero.

---

## 🛠️ Step-by-Step Code Specifications

### 1. The Live Feed Component (`LiveFeed.tsx`)
This component uses React timers to simulate real-time activity and increment counters naturally. We seed the component with a high-fidelity list of regions, active events, and actual miracle titles.

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Users } from "lucide-react";

// Localized PH regions and activities for high authenticity
const REGIONS = [
  "Manila", "Quezon City", "Davao", "Cebu", "Zamboanga", 
  "Cagayan de Oro", "Iloilo", "Baguio", "Pampanga", 
  "Bulacan", "Laguna", "Cavite", "Batangas", "Bacolod"
];

const PHRASES = [
  "kababasa lang ng milagro ngayon",
  "nagbahagi ng pag-asa sa isang kaibigan",
  "sumali sa Himala Every Day",
  "nagbasa ng 'Hindi Ka Nag-iisa'",
  "nagsimula ng kanyang faith streak"
];

const PHRASES_EN = [
  "just read today's miracle",
  "shared hope with a friend",
  "joined Himala Every Day",
  "read 'You Are Not Alone'",
  "started their faith streak"
];

export default function LiveFeed() {
  const [totalReads, setTotalReads] = useState(12480);
  const [currentEvent, setCurrentEvent] = useState({
    region: "Manila",
    phrase: "kababasa lang ng milagro ngayon",
    phraseEn: "just read today's miracle",
    timestamp: "Kasalukuyan / Just now"
  });

  useEffect(() => {
    // 1. Ticking daily counter increments naturally every 3-7 seconds
    const counterInterval = setInterval(() => {
      setTotalReads((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    // 2. Event updates simulate reading events
    const eventInterval = setInterval(() => {
      const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
      const phraseIdx = Math.floor(Math.random() * PHRASES.length);
      
      setCurrentEvent({
        region: randomRegion,
        phrase: PHRASES[phraseIdx],
        phraseEn: PHRASES_EN[phraseIdx],
        timestamp: "Kasalukuyan / Just now"
      });
    }, 6000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(eventInterval);
    };
  }, []);

  return (
    <div className="w-full bg-brand-dark-brown text-background-cream py-3 border-y border-brand-gold/30">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
        
        {/* Rolling Counter */}
        <div className="flex items-center gap-2 font-semibold">
          <Users className="w-4 h-4 text-brand-gold animate-pulse" />
          <span>
            <span className="text-brand-gold text-sm font-bold tracking-wider">
              {totalReads.toLocaleString()}
            </span>{" "}
            mga himalang nabasa ngayon / miracles read today
          </span>
        </div>

        {/* Live Ticker Feed */}
        <div className="flex items-center gap-2 overflow-hidden h-6 relative w-full md:w-auto min-w-[280px] justify-center md:justify-end">
          <Activity className="w-4 h-4 text-brand-gold" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.region + currentEvent.phrase}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="font-bold text-brand-gold">{currentEvent.region}</span>:{" "}
              <span>{currentEvent.phrase}</span>{" "}
              <span className="text-[10px] text-background-cream/60 italic font-light">
                ({currentEvent.phraseEn})
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
```

---

## 🧪 Manual Verification Instructions
1. Run `npm run dev` and view the page below the hero.
2. Watch the counter for **15 seconds**.
3. **Expected Behavior 1**: The total read counter (e.g. `12,480`) should tick up in small steps (e.g., `+1`, `+2`) every few seconds.
4. **Expected Behavior 2**: The live activity event marquee should smoothly animate out upwards, and transition in a new region (e.g. *Davao*) and action phrase, complete with translations.

## Payload CMS Integration

Recommended Payload-managed feed data:

- Approved city/region activity items.
- Pinned social proof messages.
- Daily read counter overrides.
- Published miracle titles for feed phrases.
- Referral milestones such as "Someone shared hope with a friend."

Recommended behavior:

1. Fetch recent approved feed events from Payload.
2. Merge them with simulated fallback items.
3. Keep the component fast and resilient if Payload is unavailable.
4. Store major first-party feed events in `events` only when they need admin reporting.
