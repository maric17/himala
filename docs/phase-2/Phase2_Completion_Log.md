# Phase 2 Completion Log

Last updated: 2026-05-30

This file records Stage 1 module completions in one place.

## Completed Modules

### Setup and Base Styles

- Completed on 2026-05-27
- Added new motion helpers and style tokens for overlays, glass panels, and feed animations.

### F1: On-site Capture and Smart Handoff

- Completed on 2026-05-27
- Added the shared capture flow, handoff modal, redirect URL builder, and GA CTA tracking.

### F2: Landing Page Upgrades

- Completed on 2026-05-27
- Rebuilt the hero around inline capture, refreshed `HowItWorks`, and added the FAQ accordion.

### F3: Live Miracle Feed

- Completed on 2026-05-27
- Added the live feed component with a Philippines activity marquee and rolling read counter.

### F9: UI/UX Refinements and Tracking

- Completed on 2026-05-27
- Added the mobile sticky CTA, GA CTA events, image loading improvements, and a working fallback for the dead language link.

## Partial Modules

### Payload CMS + Supabase Postgres

- Updated on 2026-05-30
- Client decided to use Payload CMS as the Phase 2 admin/data layer.
- Added `docs/phase-2/Phase2_PayloadCMS.md`.
- Installed Payload CMS and the Postgres adapter.
- Added `src/payload.config.ts` with initial `users`, `leads`, `miracles`, `events`, and `settings` collections.
- Added Payload routes under `src/app/(payload)/` for `/admin`, `/api`, `/graphql`, and `/graphql-playground`.
- Split the public site into `src/app/(frontend)/` so Payload admin no longer inherits the public header/footer layout.
- Stored local `DATABASE_URL` in ignored `.env.local`.
- Stored local `PAYLOAD_SECRET` placeholder in ignored `.env.local`.
- Documented recommended Payload collections and module use cases.
- Verified `/admin` and `/admin/login` return `200 OK` locally.
- Remaining: wire app flows, create/confirm production admin users, generate production `PAYLOAD_SECRET`, add env vars to production hosting, and finish admin QA.

### F1 Payload Lead Capture

- Updated on 2026-05-30
- Added server action `src/app/actions/lead-capture.ts`.
- The capture form now creates or updates Payload `leads` before the handoff modal redirects.
- Stored fields include email, language, preferred channel, SMS phone when selected, source, UTM values, consent flags, `consentAt`, and `handoffStatus`.
- Added Payload `events` writes for `handoff_started`.
- Added an on-site channel picker for Email, Messenger, and SMS.
- Remaining: manual in-browser submission QA and production env verification.

### F4: Chatbot Widget

- Updated on 2026-06-27
- Replaced the previous chat widget with the Bonfire widget config and script globally in `src/app/(frontend)/layout.tsx`.
- Widget ID: `0a2d4d30-6fa1-4b9e-a024-d649314a5f89`
- Script URL: `https://app.heybonfire.com/widget.js`
- Remaining: configure the Bonfire conversation flow, lead capture routing, and crisis guardrail responses inside Bonfire; then manually verify widget behavior in-browser.

### F5: Referral and "Share a Miracle" Loop

- Updated on 2026-05-30
- Added reusable static miracle content in `src/lib/miracle-content.ts`.
- Added `src/components/landing/MiracleShareButton.tsx` for native sharing and copy-link fallback.
- Added `src/app/(frontend)/share/[miracleId]/page.tsx` for referral landing pages.
- Added `src/components/landing/ReferralPageTracker.tsx` for referral page view tracking.
- Updated `src/components/landing/SampleMiracles.tsx` to use shared miracle content and display share buttons.
- Current referral URLs:
  - `/share/hes-been-thinking-about-you`
  - `/share/alam-mo-ba-ang-mga-sugat-ni-jesus`
  - `/share/alam-mo-ba-ang-pinagdaanan-ni-jesus`
- Remaining: manual QA for mobile native sharing, desktop copy-link fallback, referral page rendering, capture handoff, and GA events.

### F7: SMS and Messaging Delivery

- Updated on 2026-05-30
- Received the Semaphore API key from the client.
- Stored `SEMAPHORE_API_KEY` in local `.env.local`.
- Set local `SEMAPHORE_SENDER_NAME=HIMALA`.
- Confirmed `.env.local` is ignored by Git.
- Remaining: production env setup, Semaphore credits/Sender ID confirmation, SMS sender utility, short URL route, SMS opt-in flow, and controlled manual SMS test.

## Verification

- `npm run lint`: passed on 2026-05-27
- `npm run build`: passed on 2026-05-27
- `npm run lint`: passed on 2026-05-30
- `npm exec tsc -- --noEmit`: passed on 2026-05-30
- `npm run lint`: passed again after F1 Payload lead capture on 2026-05-30
- `npm exec tsc -- --noEmit`: passed again after F1 Payload lead capture on 2026-05-30
- `npm run build`: latest 2026-05-30 attempt hung during Turbopack optimized production build and was stopped; needs re-run.
- Manual visual and responsive QA: still pending
