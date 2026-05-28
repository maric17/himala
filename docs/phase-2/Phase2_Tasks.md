# Task List - Phase 2: Stage 1 Rollout

This is the task tracker for Phase 2: Stage 1 implementation.

Live progress tracker: [Phase2_Progress.md](./Phase2_Progress.md)

---

## Phase 2: Stage 1 Tasks

### Setup and Base Styles
- [x] Add transition keyframes and customized layout tokens in `globals.scss` for tickers and overlays.

### F1: On-site Capture and Smart Handoff
- [x] Create `HandoffModal.tsx` with a glassmorphism transition and pre-redirect loader.
- [x] Implement smart parameter capture and off-site redirection logic with pre-filled email, language, and UTM values.

### F2: Landing Page Upgrades
- [x] Update `Hero.tsx` to support inline email input and language selection above the fold on mobile.
- [x] Refine `HowItWorks.tsx` into a modern three-step progressive timeline.
- [x] Build the interactive FAQ accordion and place it near the bottom of `page.tsx`.

### F3: Live Miracle Feed
- [x] Build `LiveFeed.tsx` with localized Philippines activity.
- [x] Add a gentle rolling counter for daily reads.
- [x] Add tasteful simulated feed data with client-side fallback behavior.
- [x] Integrate `LiveFeed.tsx` high on the home page.

### F9: UI/UX Refinements and Tracking
- [x] Build `StickyCTA.tsx` for mobile scroll-based conversion support.
- [x] Fix the dead "other languages" link with a working modal fallback in the visible footer language prompt.
- [x] Integrate GA4 event tracking for key CTAs and handoff success states.
- [x] Review image optimizations and lazy-loading behavior for heavy landing assets.

### Verification and Build Checks
- [x] Run `npm run build`.
- [x] Run `npm run lint`.
- [ ] Conduct visual responsiveness testing.
