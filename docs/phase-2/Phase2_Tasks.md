# Task List — Phase 2: Stage 1 Rollout

This is the task tracker for Phase 2: Stage 1 implementation. We will mark these off as we execute the plan.

---

## 🛠️ Phase 2: Stage 1 Tasks

### 📦 Setup & Base Styles
- [ ] Add transition keyframes and customized layout tokens in [globals.scss](file:///c:/RepoOutside/himala/src/app/globals.scss) for tickers and overlays.

### 🔗 F1: On-site Capture & Smart Handoff
- [ ] Create the [HandoffModal.tsx](file:///c:/RepoOutside/himala/src/components/landing/HandoffModal.tsx) transition component (Framer Motion glassmorphism and pre-redirect loader).
- [ ] Implement smart parameter capture and off-site redirection logic (redirection URL pre-filled with email + language + UTM sources).

### 🚀 F2: Landing Page Upgrades
- [ ] Update [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx) to support inline email inputs and language selection dropdown directly above the fold on mobile.
- [ ] Refine [HowItWorks.tsx](file:///c:/RepoOutside/himala/src/components/landing/HowItWorks.tsx) to feature a modern, 3-step progressive timeline.
- [ ] Build the interactive FAQ Accordion component and place it near the bottom of [page.tsx](file:///c:/RepoOutside/himala/src/app/page.tsx).

### ⚡ F3: Live Miracle Feed
- [ ] Build [LiveFeed.tsx](file:///c:/RepoOutside/himala/src/components/landing/LiveFeed.tsx) containing:
  - [ ] A smooth marquee animation showing localized regional activity in the Philippines.
  - [ ] A gentle, ticking rolling counter for daily reads.
  - [ ] Tasteful simulated data feeds with robust fallbacks.
- [ ] Integrate [LiveFeed.tsx](file:///c:/RepoOutside/himala/src/components/landing/LiveFeed.tsx) high up on the home page.

### 📱 F9: UI/UX Refinements & Tracking
- [ ] Build [StickyCTA.tsx](file:///c:/RepoOutside/himala/src/components/landing/StickyCTA.tsx) to track scrolling activity and present a high-converting float bar on mobile.
- [ ] Fix the dead "other languages" link in [Header.tsx](file:///c:/RepoOutside/himala/src/components/Header.tsx).
- [ ] Integrate Google Analytics (GA4) event trackers for key CTAs and handoff success states.
- [ ] Review image optimizations and compress/lazy-load any heavy static assets.

### 🧪 Verification & Build Checks
- [ ] Run `npm run build` to verify Next.js compilation, standalone target compilation, and routing.
- [ ] Run `npm run lint` to enforce clean linting rules.
- [ ] Conduct visual responsiveness testing.
