# Module F1: On-site Capture & Smart Handoff — Technical Specification

This document specifies the exact code implementation, state flows, and animation rules for **F1: On-site Capture & Smart Handoff**.

---

## 🎯 Objective
Capture visitor interest (email address + selected language) on-page, show an intentional, high-converting transition animation, and seamlessly hand off the visitor to the `Jesus.net` subscribe form with their credentials pre-filled in the URL parameters.

---

## 📁 Files to Create / Modify

1. **[NEW]** [HandoffModal.tsx](file:///c:/RepoOutside/himala/src/components/landing/HandoffModal.tsx) — The glassmorphic transition screen.
2. **[MODIFY]** [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx) — The hero block containing the email input and trigger.
3. **[MODIFY]** [FinalCTA.tsx](file:///c:/RepoOutside/himala/src/components/landing/FinalCTA.tsx) — The bottom section containing a secondary input field.

---

## 🛠️ Step-by-Step Code Specifications

### 1. The Handoff Modal Component (`HandoffModal.tsx`)
Create a new file `src/components/landing/HandoffModal.tsx` utilizing Framer Motion for premium micro-animations.

#### Code Architecture:
```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface HandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  language: string;
}

export default function HandoffModal({ isOpen, onClose, email, language }: HandoffModalProps) {
  const [status, setStatus] = useState<"submitting" | "success">("submitting");

  useEffect(() => {
    if (!isOpen) {
      setStatus("submitting");
      return;
    }
    
    // Simulate short sending state, then transition to success
    const successTimeout = setTimeout(() => {
      setStatus("success");
      
      // Auto-close after showing success screen
      const closeTimeout = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(closeTimeout);
    }, 1500);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-brown/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md p-8 text-center shadow-2xl rounded-3xl bg-background-cream text-brand-brown border border-brand-gold/20"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-brand-gold mb-6" />
                <h3 className="font-serif text-2xl mb-2 text-brand-dark-brown">
                  {language === "tl" ? "Ipinapadala..." : "Sending..."}
                </h3>
                <p className="text-sm text-brand-brown/80 mb-4 font-sans">
                  {language === "tl" 
                    ? "Inihahanda namin ang iyong daily miracle stream..." 
                    : "Preparing your daily miracle stream..."}
                </p>
                <div className="w-full bg-brand-brown/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-brand-gold h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-2 text-brand-dark-brown">
                  {language === "tl" ? "Matagumpay na Naipadala!" : "Successfully Registered!"}
                </h3>
                <p className="text-sm text-brand-brown/80 font-sans">
                  {language === "tl" 
                    ? "Salamat! Ang iyong kahilingan ay natanggap na." 
                    : "Thank you! Your daily miracle request has been received."}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### 2. Integration into the Hero (`Hero.tsx`)
Modify `src/components/landing/Hero.tsx` to collect input and manage state.

#### Code Architecture to Add:
1. **Inputs**: Add email text input and a custom language dropdown (Tagalog, English).
2. **State Management**:
   ```typescript
   const [email, setEmail] = useState("");
   const [language, setLanguage] = useState("tl"); // Default Tagalog
   const [isHandoffOpen, setIsHandoffOpen] = useState(false);
   const [error, setError] = useState("");
   ```
3. **Form Handling**:
   ```typescript
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       setError("Mangyaring maglagay ng tamang email address / Please enter a valid email.");
       return;
     }
     setError("");
     setIsHandoffOpen(true);
     
     // Trigger GA4 event tracking
     if (typeof window !== "undefined" && (window as any).gtag) {
       (window as any).gtag("event", "handoff_started", {
         email_captured: true,
         selected_language: language,
       });
     }
   };
   ```
4. **Mount components**: Render `<HandoffModal isOpen={isHandoffOpen} onClose={() => setIsHandoffOpen(false)} email={email} language={language} />` directly at the root of the page or within the Hero layout.

---

## 🧪 Manual Verification Instructions
1. Navigate to the landing page.
2. In the input box, type `tester@example.com` and select "Tagalog (Filipino)" from the dropdown.
3. Click "Subukan Ngayon" / "Try Now".
4. **Expected Behavior**: A glassmorphic dark overlay with blur should fade in. A gold loading progress bar should animate to full in 1.5 seconds.
5. **Expected Redirection**: Browser must redirect to:
   `https://subscribe.jesus.net/?email=tester%40example.com&lang=tl&utm_source=himalaeveryday.ph&utm_medium=onsite_handoff`
