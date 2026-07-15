# Admin Setup Checklist — Phase 2: Himala Every Day

Hand this document to your **system admin or tech lead** to prepare all required accounts, API keys, and configurations before development begins.

---

## 🔑 Summary — What We Need

| # | Service | Module | Priority | Cost |
|---|---------|--------|----------|------|
| 1 | Bonfire account and bot flow | F4, F8 | 🔴 Critical | Plan dependent |
| 2 | Payload CMS + Supabase Postgres | F1-F8 | 🔴 Critical | Supabase plan dependent |
| 3 | Semaphore PH SMS API Key | F7 | 🟡 Stage 2 | ~₱0.50/SMS |
| 4 | Jesus.net subscribe redirect URL | F1 | 🔴 Critical | Free |
| 5 | Google Analytics 4 Property (already live?) | F9, F8 | 🔴 Critical | Free |
| 6 | Email Platform (ActiveCampaign / Mailchimp / Brevo) | F6 | 🔴 Critical | Paid/Free tier |
| 7 | Google Sheets + Looker Studio | F8 | 🟢 Optional | Free |
| 8 | Facebook Page (for Messenger channel) | F7 | 🟡 Stage 2 | Free |
| 9 | Viber Business Account | F7 | 🟢 Optional | Free |

---

## 🔴 CRITICAL — Needed Before Stage 1 Begins

### 1. Jesus.net Subscribe Redirect URL
**Module**: F1 — On-site Capture & Smart Handoff

The developer needs the **exact URL** of the off-site subscribe form on `Jesus.net` to pre-fill the captured email and language.

**Admin must confirm:**
- [ ] What is the exact subscribe form URL? (e.g. `https://subscribe.jesus.net/` or `https://ph.jesus.net/subscribe`)
- [ ] Does the URL accept query parameters? (e.g. `?email=user@example.com&lang=tl`)
- [ ] If not, is there an API endpoint or webhook we can POST to instead?

> Provide to dev team as: `JESUS_NET_SUBSCRIBE_URL=https://...`

---

### 2. Google Analytics 4 (GA4) Measurement ID
**Module**: F9 — Tracking & UI/UX, F8 — Dashboard

GA4 appears already integrated (`G-C5NXD7WFKS` is in the codebase). Admin needs to confirm:

- [ ] Is `G-C5NXD7WFKS` the correct active GA4 property for `himalaeveryday.ph`?
- [ ] Do we have **Editor or Administrator access** to this GA4 property to configure custom funnel reports and events?
- [ ] If not, grant access to the developer's Google account as Property Editor.

> No new keys needed if already configured — just confirm access.

---

### 3. Chatbot Widget — Bonfire or ManyChat
**Module**: F4 — Chat with Miracle Companion, F8 — Dashboard

The Bonfire widget config and script have been provided and added to the codebase.

**Current code configuration:**

- Widget ID: `0a2d4d30-6fa1-4b9e-a024-d649314a5f89`
- Script URL: `https://app.heybonfire.com/widget.js`
- File: `src/app/(frontend)/layout.tsx`
- Loading strategy: config uses Next.js `Script` with `afterInteractive`; widget script uses `lazyOnload`

Admin must still configure the actual bot behavior:

#### Option A: Bonfire (Current integration)
- [x] Create/provide a Bonfire widget ID
- [x] Add Bonfire widget config and script to the website code
- [ ] Confirm the Bonfire website property is tied to `himalaeveryday.ph`
- [ ] Set up at least one automated bot flow (dev team will provide the dialogue tree template)
- [ ] Configure distress keyword/crisis guardrail routing
- [ ] Verify widget load/open behavior after deployment

> Current Bonfire widget ID in code: `0a2d4d30-6fa1-4b9e-a024-d649314a5f89`

#### Option B: ManyChat (Better for Messenger/Viber)
- [ ] Create a free account at [manychat.com](https://www.manychat.com)
- [ ] Connect to the Ministry's official **Facebook Page**
- [ ] Copy the **ManyChat Page Widget script embed code**

---

### 4. Email Marketing Platform
**Module**: F6 — Email Delivery & Follow-up

Admin must choose and prepare **one** platform:

| Platform | Free Tier | Best For |
|---|---|---|
| **Brevo** (recommended) | 300 emails/day free | Simple, no per-subscriber cost |
| **Mailchimp** | 500 subscribers free | Most familiar |
| **ActiveCampaign** | No free tier | Best automation depth |

Admin must:
- [ ] Create an account on the chosen platform
- [ ] Set up a **List/Audience** named: `Himala Every Day - PH Subscribers`
- [ ] Create two automation tags: `lang-tl` (Tagalog) and `lang-en` (English)
- [ ] Enable **Double Opt-In** for Philippine DPA compliance
- [ ] Copy the **API Key** for webhook integration

> Provide to dev team as:
> ```
> EMAIL_PLATFORM_API_KEY=...
> EMAIL_LIST_ID=...
> ```

---

## 🟡 STAGE 2 — Needed Before Stage 2 Begins

### 5. Payload CMS + Supabase Postgres
**Module**: F1-F8 — Admin, Content, Leads, Referrals, Delivery Logs

Payload CMS is now the selected Phase 2 data and admin layer.

**Current local configuration:**

- Supabase pooler host: `aws-1-ap-northeast-1.pooler.supabase.com`
- Port: `6543`
- Database: `postgres`
- User: `postgres.fqyrxwiyyzruhbnrtsot`
- Local `DATABASE_URL`: stored in `.env.local`
- Local `PAYLOAD_SECRET`: placeholder only; generate a strong production value before launch.

Admin/dev tasks:

- [x] Receive Supabase connection details from client
- [x] Store local `DATABASE_URL` in ignored `.env.local`
- [ ] Rotate or confirm production database password before launch
- [ ] Add `DATABASE_URL` securely to production hosting
- [ ] Generate and add production `PAYLOAD_SECRET`
- [x] Install Payload CMS and database adapter
- [x] Create initial Payload collections
- [ ] Create/confirm production Payload admin users
- [ ] Confirm backup and retention policy in Supabase

> Do not commit the full `DATABASE_URL` because it contains the database password.

### 6. Semaphore PH SMS Gateway (True SMS)
**Module**: F7 — SMS Delivery

- [x] Receive Semaphore API key from client
- [x] Store `SEMAPHORE_API_KEY` in local `.env.local`
- [x] Set local `SEMAPHORE_SENDER_NAME=HIMALA`
- [ ] Create/confirm the production Semaphore account at [semaphore.co](https://semaphore.co)
- [ ] Purchase SMS credits (minimum ₱500 to start)
- [ ] Register a **Sender ID** (e.g. `HIMALA`) — *Note: This requires a 2–3 week telco approval process*
- [ ] Add the same env vars securely to the production hosting provider

> Provide to dev team as:
> ```
> SEMAPHORE_API_KEY=[stored in .env.local; do not commit]
> SEMAPHORE_SENDER_NAME=HIMALA
> ```

---

### 7. Facebook Page Access (for Messenger delivery)
**Module**: F7 — Messaging, F4 — Chatbot

- [ ] Confirm the **official Facebook Page** of Himala Every Day / Jesus.net PH
- [ ] Grant **Admin access** to the developer's Facebook account (needed for ManyChat integration)
- [ ] Enable **Messenger Subscriptions** on the Page settings

---

### 8. Payload Admin Dashboard and Optional Looker Studio
**Module**: F8 — Admin Dashboard

- [x] Use Payload admin as the primary dashboard foundation for content, leads, referrals, delivery logs, and settings.
- [ ] Configure admin roles: `admin`, `editor`, `support`, `viewer`.
- [ ] Add export views for leads and delivery logs.
- [ ] Optionally connect Supabase or exported CSVs to [Looker Studio](https://lookerstudio.google.com/) for visual reporting.

---

## 🟢 OPTIONAL — Nice to Have

### 8. Viber Business Account
**Module**: F7 — Messaging

If the ministry wants to deliver miracles via **Viber** (popular in Visayas and Mindanao):
- [ ] Apply for a [Viber Business Account](https://www.viber.com/en/business/) (requires business registration documents)
- [ ] Connect to ManyChat's Viber channel once approved

---

## 📋 Summary for Admin — Exact `.env` Variables Needed

Once all accounts are ready, admin must provide the developer with these environment variables to be added securely to the `.env.local` file:

```env
# --- F1: Smart Handoff ---
NEXT_PUBLIC_JESUS_NET_SUBSCRIBE_URL=https://subscribe.jesus.net/

# --- Payload CMS / Supabase ---
DATABASE_URL=postgresql://postgres.fqyrxwiyyzruhbnrtsot:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=generate-a-strong-secret

# --- F6: Email Platform ---
EMAIL_PLATFORM_API_KEY=your-api-key
EMAIL_LIST_ID=your-list-id

# --- F7: SMS Gateway (Stage 2) ---
SEMAPHORE_API_KEY=[stored securely; do not commit]
SEMAPHORE_SENDER_NAME=HIMALA

# --- F9: Analytics (already in code, just confirm) ---
NEXT_PUBLIC_GA4_ID=G-C5NXD7WFKS
```

> [!CAUTION]
> **Never commit `.env.local` to git.** The `.gitignore` must include `.env.local` to prevent accidental exposure of API keys. The developer will confirm this is already in place.

> [!NOTE]
> F2, F3, F5, and F9 can still run with static/client-side fallbacks, but the target Phase 2 architecture now uses Payload CMS for editable content, first-party events, and operational records.
