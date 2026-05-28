# Admin Setup Checklist — Phase 2: Himala Every Day

Hand this document to your **system admin or tech lead** to prepare all required accounts, API keys, and configurations before development begins.

---

## 🔑 Summary — What We Need

| # | Service | Module | Priority | Cost |
|---|---------|--------|----------|------|
| 1 | Tidio or ManyChat account | F4, F8 | 🔴 Critical | Free tier available |
| 2 | Semaphore PH SMS API Key | F7 | 🟡 Stage 2 | ~₱0.50/SMS |
| 3 | Jesus.net subscribe redirect URL | F1 | 🔴 Critical | Free |
| 4 | Google Analytics 4 Property (already live?) | F9, F8 | 🔴 Critical | Free |
| 5 | Email Platform (ActiveCampaign / Mailchimp / Brevo) | F6 | 🔴 Critical | Paid/Free tier |
| 6 | Google Sheets + Looker Studio | F8 | 🟡 Stage 2 | Free |
| 7 | Facebook Page (for Messenger channel) | F7 | 🟡 Stage 2 | Free |
| 8 | Viber Business Account | F7 | 🟢 Optional | Free |

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

### 3. Chatbot Widget — Tidio or ManyChat
**Module**: F4 — Chat with Miracle Companion, F8 — Dashboard

Admin must choose and set up **one** of the following:

#### Option A: Tidio (Recommended — simpler setup)
- [ ] Create a free account at [tidio.com](https://www.tidio.com)
- [ ] Add website property for `himalaeveryday.ph`
- [ ] Copy the **Tidio Widget Script ID** (looks like: `//code.tidio.co/XXXXXXXXXX.js`)
- [ ] Set up at least one automated bot flow (dev team will provide the dialogue tree template)

> Provide to dev team as: `TIDIO_WIDGET_ID=XXXXXXXXXX`

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

### 5. Semaphore PH SMS Gateway (True SMS)
**Module**: F7 — SMS Delivery

- [ ] Create an account at [semaphore.co](https://semaphore.co)
- [ ] Purchase SMS credits (minimum ₱500 to start)
- [ ] Register a **Sender ID** (e.g. `HIMALA`) — *Note: This requires a 2–3 week telco approval process*
- [ ] Copy the **API Key** from the Semaphore dashboard

> Provide to dev team as:
> ```
> SEMAPHORE_API_KEY=...
> SEMAPHORE_SENDER_NAME=HIMALA
> ```

---

### 6. Facebook Page Access (for Messenger delivery)
**Module**: F7 — Messaging, F4 — Chatbot

- [ ] Confirm the **official Facebook Page** of Himala Every Day / Jesus.net PH
- [ ] Grant **Admin access** to the developer's Facebook account (needed for ManyChat integration)
- [ ] Enable **Messenger Subscriptions** on the Page settings

---

### 7. Google Sheets Dashboard (Admin Visibility)
**Module**: F8 — Admin Dashboard

- [ ] Create a dedicated **Google Sheet** titled `Himala Everyday - Lead Dashboard`
- [ ] Share the sheet with **Editor access** to the email account that will manage the Tidio/Zapier webhook sync
- [ ] Optionally, enable a connected [Looker Studio](https://lookerstudio.google.com/) report for visual graphs

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

# --- F4: Chatbot Widget ---
NEXT_PUBLIC_TIDIO_WIDGET_ID=your-tidio-script-id

# --- F6: Email Platform ---
EMAIL_PLATFORM_API_KEY=your-api-key
EMAIL_LIST_ID=your-list-id

# --- F7: SMS Gateway (Stage 2) ---
SEMAPHORE_API_KEY=your-semaphore-api-key
SEMAPHORE_SENDER_NAME=HIMALA

# --- F9: Analytics (already in code, just confirm) ---
NEXT_PUBLIC_GA4_ID=G-C5NXD7WFKS
```

> [!CAUTION]
> **Never commit `.env.local` to git.** The `.gitignore` must include `.env.local` to prevent accidental exposure of API keys. The developer will confirm this is already in place.

> [!NOTE]
> F2, F3, F5, and F9 (UI/UX components) are **entirely code-side** with no external accounts needed. Development on these can begin immediately without waiting for admin setup.
