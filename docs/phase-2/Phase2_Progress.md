# Phase 2 Progress Tracker

Last updated: 2026-05-27

This file is the running progress tracker for Phase 2 work in `C:\RepoOutside\himala`.

## Status Legend

- `Done`: Implemented and verified in code.
- `Partial`: Implemented in part, but not fully finished.
- `Blocked`: Waiting on an external dependency or decision.
- `Out of scope`: Documented in Phase 2, but not part of the current Stage 1 rollout.

## Overall Snapshot

- Stage 1 is largely complete in code.
- The shared capture and handoff flow is now live across the landing page.
- Live feed, FAQ, sticky CTA, and CTA event tracking are implemented.
- Remaining work is mostly manual QA and final confirmation of the preferred production subscribe URL.

## Stage 1 Module Status

| Module | Status | Current state | Remaining |
| --- | --- | --- | --- |
| Setup and Base Styles | Done | Added feed, overlay, and motion helpers in `globals.scss`. | Manual design polish only if desired. |
| F1: On-site Capture and Smart Handoff | Done | Hero and final CTA now capture email and language, show a handoff modal, and redirect with pre-filled params and UTM values. | Confirm the final production subscribe URL if the client wants a different endpoint than the current `ph.jesus.net` flow. |
| F2: Landing Page Upgrades | Done | Hero capture UI, refreshed `HowItWorks`, and FAQ accordion are implemented. | Manual content and layout review only. |
| F3: Live Miracle Feed | Done | `LiveFeed.tsx` is built and mounted near the top of the landing page. | Optional future upgrade to real activity data if needed. |
| F9: UI/UX Refinements and Tracking | Done | Sticky CTA, GA CTA events, image loading improvements, and the dead language-link fix are implemented. | Manual analytics verification in-browser. |
| Verification and Build Checks | Partial | `npm run lint` and `npm run build` both pass. | Manual responsive and visual testing still pending. |

## Completed Work

### Setup and Base Styles

- Added transition helpers for the new feed and handoff experience.
- Added reusable glass and motion utility styles.

### F1: On-site Capture and Smart Handoff

- Added `src/components/landing/HandoffModal.tsx`.
- Added `src/components/landing/CaptureProvider.tsx`.
- Added `src/components/landing/CaptureForm.tsx`.
- Updated hero and final CTA to use the new capture flow.
- Added redirect logic carrying email, language, and UTM parameters.
- Added GA events for `cta_clicked`, `handoff_started`, and `handoff_success`.

### F2: Landing Page Upgrades

- Rebuilt the hero around inline capture instead of a simple outbound CTA.
- Refined `HowItWorks.tsx` into a stronger three-step progression.
- Added `src/components/landing/FAQAccordion.tsx`.
- Mounted the FAQ near the bottom of `src/app/page.tsx`.

### F3: Live Miracle Feed

- Added `src/components/landing/LiveFeed.tsx`.
- Added a localized Philippines activity marquee.
- Added a rolling daily reads counter.
- Mounted the feed high on the landing page.

### F9: UI/UX Refinements and Tracking

- Added `src/components/landing/StickyCTA.tsx`.
- Replaced the visible dead "other languages" footer link with a modal fallback.
- Improved key landing images with `sizes` tuning and removed below-the-fold eager loading where appropriate.
- Added CTA support in more sections to reinforce the conversion path.

## Verification Status

- `npm run lint`: passed
- `npm run build`: passed
- Manual responsive testing: pending
- Manual redirect and analytics testing in-browser: pending

## Out of Current Stage 1 Scope

- F4: Chatbot
- F5: Referral Loop
- F6: Email Config
- F7: SMS Delivery
- F8: Admin SaaS

## Next Checks

1. Review the landing page visually on mobile and desktop.
2. Test the handoff flow in a browser and confirm the subscribe destination behaves correctly.
3. Verify GA events in the browser or GA debug tools.
