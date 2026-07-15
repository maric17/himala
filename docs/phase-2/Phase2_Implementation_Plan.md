# Implementation Plan — Phase 2: Stage 1 Rollout

This implementation plan details the frontend upgrades, smart captures, real-time feedback tickers, tracking setup, and updated **Payload CMS + Supabase Postgres** architecture for Phase 2.

---

## 📋 Goal Description
Implement Stage 1 of the Phase 2 Scope of Work to immediately boost visitor conversion, create a livelier and more interactive page presence, and establish clean analytical baselines:
* **F1: On-site Capture & Smart Handoff**: Capturing user interest/language on-page, showing a beautiful transition animation, and pre-filling the off-site `Jesus.net` subscribe form.
* **F2: Landing Page Upgrades**: Adding above-the-fold CTA placement, a structured 3-step timeline ("How it Works"), and a fully responsive FAQ section.
* **F3: Live Miracle Feed**: Creating a smooth, regional ticker displaying real-time or tasteful simulated reading activity to build high social proof.
* **F4: Chatbot Widget**: Loading the provided Bonfire widget config and script globally while bot flow configuration remains in Bonfire.
* **F5: Referral Loop**: Creating shareable miracle content and `/share/[miracleId]` referral pages that feed back into the capture flow.
* **F6-F8: Payload CMS Operations Layer**: Managing leads, content, preferences, referrals, delivery logs, and admin workflows through Payload CMS backed by Supabase Postgres.
* **F9: UI/UX Refinements (Stage 1)**: Implementing a sticky CTA on mobile, optimizing images, fixing dead links, and setting up Google Analytics conversion event tracking.

---

## 👥 User Review Required

> [!IMPORTANT]
> **Key Architecture Decisions (Payload CMS + High-Performance Frontend)**
> 1. **Payload CMS Admin Layer**: Phase 2 now uses Payload CMS backed by Supabase Postgres for editable content, leads, channel preferences, consent records, referrals, delivery logs, and admin workflows.
> 2. **GA4 Still Handles Aggregate Analytics**: GA4 remains the tool for traffic and funnel analysis. Payload stores first-party operational records that need review, follow-up, or export.
> 3. **Pre-Filled Handoff redirection**: F1 can still pass captured emails and languages to `Jesus.net`, but it should also create/update a Payload `leads` record before redirecting.
> 4. **CMS-Backed Feed and Referrals**: F3 and F5 can begin with static/simulated data, then migrate to Payload collections for editorial control.

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

#### [NEW] `src/lib/miracle-content.ts`
* **Purpose**: Shared static content source for referral-ready miracle cards and `/share/[miracleId]` pages.

#### [NEW] `src/components/landing/MiracleShareButton.tsx`
* **Purpose**: Native share/copy-link component for miracle cards and referral pages, with GA tracking for `miracle_shared`.

#### [NEW] `src/components/landing/ReferralPageTracker.tsx`
* **Purpose**: Lightweight client component that fires `referral_page_viewed` when a referral page loads.

#### [NEW] Payload CMS
* **Purpose**: Admin and data layer for content, leads, referrals, preferences, consent, delivery logs, and operational reporting.
* **Database**: Supabase Postgres via shared transaction pooler.
* **Architecture details**: See [Phase2_PayloadCMS.md](./Phase2_PayloadCMS.md).

---

### 2. Modified Components

#### [MODIFY] [globals.scss](file:///c:/RepoOutside/himala/src/app/globals.scss)
* **Purpose**: Add custom styling tokens for the glassmorphism modal, ticker animations, and smooth sliding transitions.

#### [MODIFY] `src/app/(frontend)/page.tsx`
* **Purpose**: Update the root page layout to mount `LiveFeed` high up, integrate the capture forms, and place the mobile `StickyCTA` at the root.

#### [MODIFY] `src/app/(frontend)/layout.tsx`
* **Purpose**: Load the provided Bonfire widget config and script globally using Next.js `Script`; the config uses `afterInteractive` and the widget script uses `lazyOnload`.
* **Current Bonfire widget ID**: `0a2d4d30-6fa1-4b9e-a024-d649314a5f89`
* **Current script**: `https://app.heybonfire.com/widget.js`

#### [NEW] `src/app/(frontend)/share/[miracleId]/page.tsx`
* **Purpose**: Render a referral landing page for each shared miracle, including the miracle content, original Jesus.net link, share button, and `friend_referral` capture form. Current implementation is static; target implementation should load miracle content from Payload.

#### [MODIFY] [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx)
* **Purpose**: Sharpen the copy ("A small miracle, every morning — free"), place a direct email input + language dropdown above the fold on mobile, and hook it up to the `HandoffModal` trigger.

#### [MODIFY] [HowItWorks.tsx](file:///c:/RepoOutside/himala/src/components/landing/HowItWorks.tsx)
* **Purpose**: Implement the visual 3-step vertical/horizontal timeline highlighting the transition from sharing feelings to experiencing daily shift.

#### [MODIFY] [SampleMiracles.tsx](file:///c:/RepoOutside/himala/src/components/landing/SampleMiracles.tsx) & [Testimonials.tsx](file:///c:/RepoOutside/himala/src/components/landing/Testimonials.tsx)
* **Purpose**: Inject repeated capture CTAs at these natural transition points so visitors can subscribe easily at high-interest moments.
* **F5 update**: `SampleMiracles.tsx` now renders from `src/lib/miracle-content.ts` and includes share buttons on each miracle card.

#### [MODIFY] [Header.tsx](file:///c:/RepoOutside/himala/src/components/Header.tsx)
* **Purpose**: Fix the dead "other languages" link to redirect smoothly or show a clean localized modal.

---

## 🧪 Verification Plan

### Automated Build Verification
* Run `npm run build` and `npm run lint` to ensure that TypeScript compilation and Tailwind v4 compilation complete perfectly.
* Validate component compilation with zero hydration mismatches.
* After Payload is installed, validate database connection, collection generation, and Payload admin route startup.

### Manual Verification
1. **Redirect Testing**: Type an email in the `Hero` input, select a language, and click "Get my Daily Miracle". Ensure the transition modal plays beautifully and the browser successfully redirects to the `Jesus.net` subscription site with matching query parameters in the URL bar.
2. **Responsive Checks**: Shrink the viewport to mobile sizes to verify that the Hero capture is fully above the fold, image sizes are optimized, and the sticky CTA bar appears smoothly as you scroll down.
3. **Analytics Audits**: Monitor the developer console to confirm that custom GA4 event payloads (e.g., `handoff_started`, `cta_clicked`) fire correctly on user interaction.
