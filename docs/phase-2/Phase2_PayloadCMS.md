# Phase 2 Payload CMS Architecture

Last updated: 2026-05-30

This document records the updated Phase 2 direction: use **Payload CMS** with **Supabase Postgres** as the operational content, lead, and admin data layer.

The earlier Phase 2 plan was intentionally database-light. That is now superseded for modules where editorial control, lead management, channel preferences, delivery logs, consent records, and admin reporting are valuable.

---

## Database Connection

Use the Supabase shared pooler connection for Payload CMS.

```env
DATABASE_URL=postgresql://postgres.fqyrxwiyyzruhbnrtsot:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=[GENERATE-A-STRONG-SECRET]
```

Connection details:

| Field | Value |
| --- | --- |
| Host | `aws-1-ap-northeast-1.pooler.supabase.com` |
| Port | `6543` |
| Database | `postgres` |
| User | `postgres.fqyrxwiyyzruhbnrtsot` |
| Pooler | Shared transaction pooler |

Security notes:

- The database password must stay only in `.env.local` and production hosting environment variables.
- Do not commit the full connection string.
- The local `.env.local` file has been updated and is ignored by Git.
- Rotate the Supabase database password before production if this chat is not treated as a secure secret channel.

---

## Why Payload CMS

Payload gives the team a real admin surface without building a custom dashboard from scratch. It can own the pieces that need content editing, lead review, consent records, delivery status, and campaign operations.

Keep GA4 for aggregate traffic analytics. Use Payload for first-party operational records.

---

## Payload Use Cases By Module

| Module | Payload use cases |
| --- | --- |
| F1: Capture and Handoff | Store leads, language preference, channel preference, UTM source, consent timestamp, handoff status, subscribe URL, error state. |
| F2: Landing Upgrades | Manage landing copy, hero copy variants, FAQ entries, testimonials, CTA labels, feature blocks, localized strings. |
| F3: Live Feed | Replace or augment simulated feed with curated feed events, city/region activity, display rules, pinned social proof items. |
| F4: Chatbot | Store chatbot leads, initial feeling, conversation source, Bonfire contact ID, crisis flag, follow-up status, staff notes. |
| F5: Referral Loop | Manage miracle content, share slugs, referral landing copy, share metadata, referral clicks, referral conversion source. |
| F6: Email Delivery | Store email templates, segments, subscription status, double opt-in status, unsubscribe records, delivery provider IDs, campaign logs. |
| F7: SMS/Messaging | Store phone opt-ins, verification status, channel selection, sender consent, SMS delivery logs, Semaphore message IDs, short links. |
| F8: Admin Dashboard | Use Payload admin as the primary dashboard for leads, content, campaigns, referrals, delivery state, and exports. |
| F9: UI/UX and Tracking | Store tracked first-party conversion events, experiments, CTA variants, redirect destinations, language modal destinations. |

---

## Recommended Collections

### `users`

Payload admin users and roles.

Suggested fields:

- `email`
- `name`
- `role`: `admin`, `editor`, `support`, `viewer`
- `active`

### `leads`

Primary record for people who interact with the capture flow.

Suggested fields:

- `email`
- `phone`
- `language`: `tl`, `en`
- `preferredChannel`: `email`, `messenger`, `sms`, `viber`
- `source`: `landing`, `friend_referral`, `chat`, `sms_test`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmContent`
- `consentEmail`
- `consentSms`
- `consentMessenger`
- `consentAt`
- `doubleOptInStatus`: `pending`, `confirmed`, `failed`, `not_required`
- `handoffStatus`: `started`, `completed`, `failed`
- `externalProviderId`
- `notes`

### `miracles`

Daily miracle content and shareable referral content.

Suggested fields:

- `title`
- `slug`
- `language`
- `excerpt`
- `body`
- `scripture`
- `image`
- `originalUrl`
- `publishDate`
- `status`: `draft`, `scheduled`, `published`, `archived`
- `shareText`
- `seoTitle`
- `seoDescription`

### `referrals`

Tracks shared miracle visits and conversion context.

Suggested fields:

- `miracle`
- `referrerLead`
- `shareMethod`: `web_share_api`, `copy_link`, `manual`
- `landingPath`
- `clickedAt`
- `convertedLead`
- `convertedAt`
- `utmSource`
- `utmCampaign`

### `chatContacts`

Operational mirror of chatbot contacts.

Suggested fields:

- `lead`
- `bonfireContactId`
- `manyChatContactId`
- `initialFeeling`
- `conversationStatus`
- `crisisFlag`
- `crisisHandledAt`
- `lastMessageAt`
- `followUpOwner`

### `messageTemplates`

Reusable content for email, SMS, Messenger, and Viber.

Suggested fields:

- `name`
- `channel`: `email`, `sms`, `messenger`, `viber`
- `language`
- `subject`
- `body`
- `status`
- `providerTemplateId`

### `deliveryLogs`

Audit trail for outbound messages.

Suggested fields:

- `lead`
- `channel`
- `template`
- `provider`: `brevo`, `mailchimp`, `activecampaign`, `semaphore`, `bonfire`, `manychat`
- `providerMessageId`
- `status`: `queued`, `sent`, `delivered`, `failed`, `bounced`, `unsubscribed`
- `error`
- `sentAt`
- `deliveredAt`

### `shortLinks`

Short trackable links for SMS and referral campaigns.

Suggested fields:

- `code`
- `destinationUrl`
- `miracle`
- `campaign`
- `clickCount`
- `expiresAt`

### `events`

First-party event records for important conversion actions.

Suggested fields:

- `eventName`
- `lead`
- `miracle`
- `source`
- `path`
- `metadata`
- `createdAt`

### `settings`

Site and integration settings editable by admins.

Suggested fields:

- `jesusNetSubscribeUrl`
- `otherLanguagesUrl`
- `ga4MeasurementId`
- `bonfireWidgetId`
- `semaphoreSenderName`
- `defaultLanguage`
- `enableSmsCapture`
- `enableMessengerCapture`

---

## Module Changes

### F1 Capture

Current behavior redirects users to the Jesus.net subscribe flow. With Payload, the capture should also create or update a `leads` record before redirecting.

Recommended flow:

1. User submits email, language, and preferred channel.
2. Server action validates input.
3. Server action creates or updates `leads`.
4. Store consent and UTM metadata.
5. Continue to the existing handoff modal and redirect.

### F2 Landing Content

Move editable content into Payload after the base implementation is stable:

- FAQs
- testimonials
- hero copy
- CTA labels
- trust stats
- image references

### F3 Live Feed

Payload can store curated live-feed items instead of relying only on simulated client-side items.

Recommended:

- Keep simulated fallback.
- Add Payload collection for approved feed events.
- Render the latest approved events first.

### F4 Chatbot

Bonfire remains the front-end chat widget. Payload becomes the internal record layer for:

- chat-created leads
- initial feelings
- crisis flags
- follow-up status
- staff notes

### F5 Referral

The current static `src/lib/miracle-content.ts` content can be migrated into the `miracles` collection.

Recommended next state:

- `/share/[miracleId]` loads from Payload by slug.
- Share buttons record `referrals` or `events`.
- Referral conversions link back to the original shared miracle.

### F6 Email

Payload should not replace a dedicated email sender. Use it as the source of truth for subscriber state and template content.

Recommended:

- Payload stores leads, segments, templates, and delivery logs.
- Brevo/Mailchimp/ActiveCampaign sends the email.
- Webhooks update Payload delivery status.

### F7 SMS

Payload should store opt-in records, phone verification state, message templates, short links, and Semaphore delivery logs.

Recommended:

- Never expose Semaphore keys client-side.
- Require explicit SMS consent.
- Verify phone ownership before daily SMS.
- Keep all SMS messages under 160 characters when possible.

### F8 Admin

Payload admin becomes the primary Phase 2 admin dashboard.

Use it for:

- lead search and exports
- content editing
- referral monitoring
- delivery logs
- opt-in state
- simple operational reporting

Looker Studio remains optional for richer visualization.

### F9 Tracking

Keep GA4 for aggregate analytics. Use Payload for first-party conversion events that need operational follow-up.

Examples:

- `lead_created`
- `handoff_started`
- `handoff_success`
- `miracle_shared`
- `referral_page_viewed`
- `sms_opt_in_started`
- `sms_verified`

---

## Environment Variables

Local `.env.local` should contain:

```env
DATABASE_URL=postgresql://postgres.fqyrxwiyyzruhbnrtsot:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=[GENERATE-A-STRONG-SECRET]
SEMAPHORE_API_KEY=[STORED-SECURELY]
SEMAPHORE_SENDER_NAME=HIMALA
```

Production hosting must receive the same variables securely.

---

## Optional Supabase Agent Skills

The client provided:

```bash
npx skills add supabase/agent-skills
```

This is optional. Do not run it unless the team wants to install those instructions locally and approves any network/package changes.

---

## Implementation Status

Completed locally on 2026-05-30:

1. Installed Payload CMS dependencies and the Postgres database adapter.
2. Added `src/payload.config.ts`.
3. Connected Payload to Supabase through `DATABASE_URL`.
4. Added initial collections: `users`, `leads`, `miracles`, `settings`, and `events`.
5. Added Payload routes for `/admin`, `/api`, `/graphql`, and `/graphql-playground`.
6. Split the public frontend routes from Payload routes so `/admin/login` resolves correctly.
7. Verified `/admin` and `/admin/login` return `200 OK` locally.
8. Added F1 lead capture writes through `src/app/actions/lead-capture.ts`.
9. Added channel preference capture for Email, Messenger, and SMS.

## Next Implementation Steps

1. Generate and deploy a strong production `PAYLOAD_SECRET`.
2. Add `DATABASE_URL`, `PAYLOAD_SECRET`, and Semaphore env vars to production hosting.
3. Create or confirm production Payload admin users and role assignments.
4. Migrate static F5 miracle content into Payload.
5. Add SMS phone verification before any real SMS sending.
6. Add role-based admin access, exports, and DPA retention workflows.
7. Wire F5 referral clicks/conversions into Payload events.
8. Re-run lint, typecheck, build, and manual QA.
