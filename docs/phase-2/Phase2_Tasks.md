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
- [x] Add Payload-backed lead creation/update before handoff redirect.
- [x] Store consent, channel preference, and UTM metadata in Payload.
- [x] Add on-site channel picker for Email, Messenger, and SMS preference capture.

### F2: Landing Page Upgrades
- [x] Update `Hero.tsx` to support inline email input and language selection above the fold on mobile.
- [x] Refine `HowItWorks.tsx` into a modern three-step progressive timeline.
- [x] Build the interactive FAQ accordion and place it near the bottom of `page.tsx`.

### F3: Live Miracle Feed
- [x] Build `LiveFeed.tsx` with localized Philippines activity.
- [x] Add a gentle rolling counter for daily reads.
- [x] Add tasteful simulated feed data with client-side fallback behavior.
- [x] Integrate `LiveFeed.tsx` high on the home page.
- [ ] Add optional Payload-backed curated live feed events.

### Payload CMS and Supabase
- [x] Document Payload CMS architecture and use cases in `Phase2_PayloadCMS.md`.
- [x] Store local `DATABASE_URL` in ignored `.env.local`.
- [x] Document Supabase connection details without exposing the password.
- [x] Install Payload CMS and the Postgres adapter.
- [x] Configure Payload with Supabase `DATABASE_URL`.
- [x] Create initial collections: `users`, `leads`, `miracles`, `settings`, `events`.
- [x] Add Payload route group for `/admin`, `/api`, `/graphql`, and `/graphql-playground`.
- [x] Split frontend and Payload route groups so `/admin/login` no longer 404s.
- [ ] Add role-based admin access.
- [ ] Add DPA retention and export/deletion workflows.

### F4: Chatbot Widget
- [x] Add the Bonfire widget config and script globally in `src/app/(frontend)/layout.tsx`.
- [ ] Configure and manually verify the Bonfire bot flow, including crisis guardrail responses.

### F5: Referral and "Share a Miracle" Loop
- [x] Create reusable miracle content in `src/lib/miracle-content.ts`.
- [x] Add native share/copy-link behavior with GA tracking via `MiracleShareButton.tsx`.
- [x] Add dynamic referral pages at `/share/[miracleId]`.
- [x] Add referral page view tracking via `ReferralPageTracker.tsx`.
- [x] Update `SampleMiracles.tsx` cards with share buttons using the shared content source.
- [ ] Migrate miracle content from static file into Payload `miracles` collection.
- [ ] Store referral clicks/conversions in Payload.
- [ ] Manually verify sharing on mobile and desktop.
- [ ] Manually verify referral page capture handoff and analytics events in-browser.

### F6: Email Delivery and Follow-Up
- [ ] Use Payload `leads`, `messageTemplates`, and `deliveryLogs` collections as the operational source of truth.
- [ ] Configure email provider integration while keeping delivery status mirrored in Payload.
- [ ] Store double opt-in, unsubscribe, and suppression states in Payload.

### F7: SMS and Messaging Delivery
- [x] Store the provided Semaphore API key in local `.env.local`.
- [x] Set local `SEMAPHORE_SENDER_NAME=HIMALA`.
- [x] Capture SMS as a preferred channel with a required PH mobile number and store consent in Payload.
- [ ] Add Semaphore env vars to production hosting.
- [ ] Confirm Semaphore account credits and production Sender ID.
- [ ] Store phone verification status and delivery logs in Payload.
- [ ] Implement `src/lib/sms-sender.ts`.
- [ ] Add SMS opt-in and verification before sending any production SMS.

### F8: Payload Admin Dashboard
- [x] Use Payload admin as the primary admin dashboard foundation.
- [ ] Add lead search/export views.
- [ ] Add content editing workflows for miracles, FAQs, testimonials, and templates.
- [ ] Add referral and delivery-log monitoring.

### F9: UI/UX Refinements and Tracking
- [x] Build `StickyCTA.tsx` for mobile scroll-based conversion support.
- [x] Fix the dead "other languages" link with a working modal fallback in the visible footer language prompt.
- [x] Integrate GA4 event tracking for key CTAs and handoff success states.
- [x] Review image optimizations and lazy-loading behavior for heavy landing assets.

### Verification and Build Checks
- [x] Run `npm run build`.
- [x] Run `npm run lint`.
- [x] Run `npm exec tsc -- --noEmit`.
- [x] Re-run `npm run build` successfully after the Bonfire widget replacement.
- [ ] Conduct visual responsiveness testing.
