# Module F9: UI/UX Refinements — Technical Specification

This document specifies the sticky floating CTA on mobile, dead link fixes, and image performance optimizations for **F9: UI/UX Refinements**.

> [!NOTE]
> GA4 custom event tracking is **not in scope** for Phase 2 SOW. The existing `G-C5NXD7WFKS` script tag from Phase 1 is left untouched but no new custom events or funnel configurations are added.

---

## 🎯 Objective
Polish visual pathways to elevate trust and conversion across three focused areas:
* **Sticky mobile CTA**: Ensure a floating entry bar is always one tap away as users scroll the long vertical page.
* **Link cleanup**: Repair dead navigation anchors in the Header.
* **Image optimization**: Ensure all static assets use Next.js `<Image>` with lazy loading and correct sizing.

---

## 📁 Files to Create / Modify

1. **[NEW]** [StickyCTA.tsx](file:///c:/RepoOutside/himala/src/components/landing/StickyCTA.tsx) — Sticky mobile footer bar.
2. **[MODIFY]** [Header.tsx](file:///c:/RepoOutside/himala/src/components/Header.tsx) — Fix navigational dead anchors.
3. **[AUDIT]** All landing section components — Review and optimize `<Image>` tags for lazy loading and correct `sizes` attributes.

---

## 🛠️ Step-by-Step Code Specifications

### 1. Sticky Mobile CTA (`StickyCTA.tsx`)
Create a floating bar component that appears only when the user scrolls past the primary hero section on small devices.

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility if user scrolls past 600px (beyond Hero form)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Track click event in GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "sticky_cta_clicked", {
        device: "mobile"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-brand-dark-brown/90 backdrop-blur-md border-t border-brand-gold/20 flex items-center justify-between md:hidden"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider text-brand-gold font-bold">
              Himala Every Day
            </span>
            <span className="text-xs text-background-cream font-serif font-light">
              Isang milagro tuwing umaga
            </span>
          </div>
          <button
            onClick={scrollToHero}
            className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark-brown px-4 py-2 rounded-full text-xs font-bold font-sans shadow-lg transition-transform active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            Subukan / Try Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### 2. Header Link Cleanup (`Header.tsx`)
The "Other Languages" button in the Header currently uses a dead `href="#"` that resets scroll position with no destination.

**Fix**: Replace with the confirmed destination URL provided by the client (e.g., `https://jesus.net/languages/`), or render a clean informational modal until the client confirms the correct destination.

> [!IMPORTANT]
> **Client action required**: Confirm where the "Other Languages" button should redirect — either an existing Jesus.net international page or a planned localized page on `himalaeveryday.ph`.

---

### 3. Image Performance Optimization (Audit)
Review all landing section components for the following:
* All images use Next.js `<Image>` component (never plain `<img>` tags).
* Each `<Image>` has correct `sizes` prop to prevent oversized downloads on mobile.
* Hero and above-the-fold images use `priority` prop.
* Below-the-fold images rely on the default lazy loading behavior.
* Any large static assets (e.g., background textures) are compressed to WebP format before deployment.

---

## 🧪 Manual Verification Instructions
1. Load the landing page in **Mobile View** (Chrome DevTools, 390px width).
2. Scroll down slowly past the Hero section.
3. **Expected**: The sticky float bar slides up smoothly from the bottom.
4. Click the float button → page animates back to the top Hero form.
5. Click the **"Other Languages"** link in the Header → it must navigate to a valid URL (not `#`).
6. Run **Chrome Lighthouse** on the landing page → Target a Performance score of **90+** with no "oversized images" warnings.
