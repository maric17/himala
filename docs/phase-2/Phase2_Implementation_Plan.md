# Implementation Plan — Phase 2: Stage 1 Rollout

This implementation plan details the frontend upgrades, smart captures, real-time feedback tickers, and tracking setups for **Stage 1** of Phase 2, adhering strictly to a **database-less, lightweight architecture**.

---

## 📋 Goal Description
Implement Stage 1 of the Phase 2 Scope of Work to immediately boost visitor conversion, create a livelier and more interactive page presence, and establish clean analytical baselines:
* **F1: On-site Capture & Smart Handoff**: Capturing user interest/language on-page, showing a beautiful transition animation, and pre-filling the off-site `Jesus.net` subscribe form.
* **F2: Landing Page Upgrades**: Adding above-the-fold CTA placement, a structured 3-step timeline ("How it Works"), and a fully responsive FAQ section.
* **F3: Live Miracle Feed**: Creating a smooth, regional ticker displaying real-time or tasteful simulated reading activity to build high social proof.
* **F9: UI/UX Refinements (Stage 1)**: Implementing a sticky CTA on mobile, optimizing images, fixing dead links, and setting up Google Analytics conversion event tracking.

---

## 👥 User Review Required

> [!IMPORTANT]
> **Key Architecture Decisions (Database-less & High-Performance)**
> 1. **Zero Database Integration**: All metrics are stored directly inside Google Analytics (traffic, button clicks, conversions) and Tidio/ManyChat (lead generation, conversation data). No local database is created, preventing complex migrations and backend hosting fees.
> 2. **Pre-Filled Handoff redirection**: F1 uses clean query parameters to pass captured emails and languages directly to `Jesus.net` so that users don't have to fill out the form twice.
> 3. **High-Fidelity Simulated Feed**: F3 (Live Feed) uses a highly realistic, localized ticker seeded with real regional activity in the Philippines (e.g., Cebu, Manila, Davao) that ticks up at random natural intervals. This provides rich social proof without introducing database roundtrips.

---

## 🛠️ Proposed Changes

We will introduce a modular set of components and modify the existing landing sections.

### 1. New Components

#### [NEW] [HandoffModal.tsx](file:///c:/RepoOutside/himala/src/components/landing/HandoffModal.tsx)
* **Purpose**: A stunning, full-screen glassmorphic overlay using Framer Motion that appears when a user clicks the capture CTA. It says: *"You're almost there! Connecting you to Himala Every Day..."*, providing a warm, intentional transition before redirecting to the off-site subscribe form.

#### [NEW] [LiveFeed.tsx](file:///c:/RepoOutside/himala/src/components/landing/LiveFeed.tsx)
* **Purpose**: A marquee-style regional feed placed high on the page (near the Hero). It shows ticker items like *"Someone in Davao just read today's miracle"* or *"A reader in Cebu joined"*, with a rolling counter *"12,480 miracles read today"* ticking up gently.

#### [NEW] [StickyCTA.tsx](file:///c:/RepoOutside/himala/src/components/landing/StickyCTA.tsx)
* **Purpose**: A slim, high-converting sticky floating bar at the bottom of the viewport on mobile devices. It provides a single tap path back to the capture form as the user scrolls the long landing page.

---

### 2. Modified Components

#### [MODIFY] [globals.scss](file:///c:/RepoOutside/himala/src/app/globals.scss)
* **Purpose**: Add custom styling tokens for the glassmorphism modal, ticker animations, and smooth sliding transitions.

#### [MODIFY] [page.tsx](file:///c:/RepoOutside/himala/src/app/page.tsx)
* **Purpose**: Update the root page layout to mount `LiveFeed` high up, integrate the capture forms, and place the mobile `StickyCTA` at the root.

#### [MODIFY] [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx)
* **Purpose**: Sharpen the copy ("A small miracle, every morning — free"), place a direct email input + language dropdown above the fold on mobile, and hook it up to the `HandoffModal` trigger.

#### [MODIFY] [HowItWorks.tsx](file:///c:/RepoOutside/himala/src/components/landing/HowItWorks.tsx)
* **Purpose**: Implement the visual 3-step vertical/horizontal timeline highlighting the transition from sharing feelings to experiencing daily shift.

#### [MODIFY] [SampleMiracles.tsx](file:///c:/RepoOutside/himala/src/components/landing/SampleMiracles.tsx) & [Testimonials.tsx](file:///c:/RepoOutside/himala/src/components/landing/Testimonials.tsx)
* **Purpose**: Inject repeated capture CTAs at these natural transition points so visitors can subscribe easily at high-interest moments.

#### [MODIFY] [Header.tsx](file:///c:/RepoOutside/himala/src/components/Header.tsx)
* **Purpose**: Fix the dead "other languages" link to redirect smoothly or show a clean localized modal.

---

## 🧪 Verification Plan

### Automated Build Verification
* Run `npm run build` and `npm run lint` to ensure that TypeScript compilation and Tailwind v4 compilation complete perfectly.
* Validate component compilation with zero hydration mismatches.

### Manual Verification
1. **Redirect Testing**: Type an email in the `Hero` input, select a language, and click "Get my Daily Miracle". Ensure the transition modal plays beautifully and the browser successfully redirects to the `Jesus.net` subscription site with matching query parameters in the URL bar.
2. **Responsive Checks**: Shrink the viewport to mobile sizes to verify that the Hero capture is fully above the fold, image sizes are optimized, and the sticky CTA bar appears smoothly as you scroll down.
3. **Analytics Audits**: Monitor the developer console to confirm that custom GA4 event payloads (e.g., `handoff_started`, `cta_clicked`) fire correctly on user interaction.
