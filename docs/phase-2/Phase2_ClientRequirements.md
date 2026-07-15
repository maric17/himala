# Technical Credentials & Client Requirements — Phase 2 Rollout
**Project**: Himala Every Day (Himala.net PH)  
**Target Audience**: Client Tech Leads, System Administrators, & Project Stakeholders  
**Date**: May 2026  

---

## 🎯 Executive Summary
To successfully implement Phase 2 of the **Himala Every Day** platform (including On-site Captures, Smart Handoffs, Live Feeds, Conversational Chatbots, and automated Email/SMS nurturing), the development team requires specific credentials, API keys, platform configurations, and legal compliance checks from the client.

This document serves as the **definitive blueprint** of what the client must provide. We have divided these requirements into **Stage 1 (Immediate)** and **Stage 2 (Messaging Nurture)** to keep execution fast and block-free.

---

## 🔑 At-a-Glance Credentials Checklist

| Module | Priority | Service / Asset Required | Purpose | Status |
| :--- | :---: | :--- | :--- | :---: |
| **F1** | 🟢 Resolved | **None (Fully On-Page)** | Capture input & show local success modal | [x] Resolved |
| **Payload CMS** | 🔴 Critical | **Supabase Postgres connection** | Store content, leads, preferences, referrals, consent, delivery logs, admin data | [~] Local env added |
| **F4** | 🔴 Critical | **Bonfire Widget ID** | empathetically engage visitors & direct to CTAs | [x] Widget ID added |
| **F6** | 🔴 Critical | **Email Platform API Key & List ID** | Trigger daily miracle emails & nurture sequences | [ ] Pending |
| **F7** | 🟡 Stage 2 | **Semaphore PH SMS API Key & Sender ID** | Send daily miracles via direct Philippine SMS | [~] API key received; Sender ID pending |
| **F7 / F4** | 🟡 Stage 2 | **Facebook Page Admin Access** | Deliver daily updates via FB Messenger | [ ] Pending |
| **F7** | 🟢 Optional | **Viber Business Account** | Deliver updates via Viber (popular in Visayas/Mindanao) | [ ] Pending |

---

## 🔴 STAGE 1 — Immediate Requirements

### 1. On-site Capture (Smart Handoff) — [RESOLVED]
* **Goal**: Establish a seamless on-site capture where users enter their email and language, see a premium glassmorphic loader, and receive a beautifully animated confirmation stating that their request has been successfully sent, automatically closing the modal.
* **What the Client Needs to Provide**:
  * **None**. This is 100% frontend and code-driven. No external off-site redirect form or webhook credentials are required for this flow in Stage 1, allowing deployment to start immediately without any client configuration blockages.

---

### 2. Empathic Chatbot Widget (Bonfire / ManyChat)
* **Goal**: Integrate a beautiful, warm virtual chatbot named **Miracle** that listens to users’ feelings, shares hope, and funnels them toward active subscriptions with crisis safety nets.
* **Current status**:
  * The Bonfire widget ID has been provided and added to `src/app/(frontend)/layout.tsx`.
  * Current widget ID: `0a2d4d30-6fa1-4b9e-a024-d649314a5f89`
  * Current script: `https://app.heybonfire.com/widget.js`
* **What the Client Still Needs to Provide / Confirm**:
  1. **Bonfire Bot Flow Access and Setup**:
     * Configure or approve the actual Bonfire conversation flow in the Bonfire dashboard.
     * Confirm lead capture routing and tags for Himala Every Day.
  2. **ManyChat Page Widget (Alternative, only if switching away from Bonfire)**:
     * If the client prefers to connect directly to Facebook Messenger/Viber, create an account on [manychat.com](https://www.manychat.com) and provide the Page Widget Embed Script.
  3. **Crisis Protocols**: Verify if the standard crisis hotlines configured in our guardrail (National Center for Mental Health - NCMH: **1553**, **0917-899-8727**) are correct, or if there is a preferred, dedicated list of localized counseling hotlines/ministry partners.

### 3. Referral Content and Share Pages — [CODE IMPLEMENTED]
* **Goal**: Let visitors share specific miracle messages using `/share/[miracleId]` URLs that invite friends into the same capture flow.
* **Current status**:
  * Static referral content is implemented in `src/lib/miracle-content.ts`.
  * Share buttons are implemented in `src/components/landing/MiracleShareButton.tsx`.
  * Dynamic referral pages are implemented at `src/app/(frontend)/share/[miracleId]/page.tsx`.
  * Current share URLs:
    * `/share/hes-been-thinking-about-you`
    * `/share/alam-mo-ba-ang-mga-sugat-ni-jesus`
    * `/share/alam-mo-ba-ang-pinagdaanan-ni-jesus`
* **What the Client Still Needs to Provide / Confirm**:
  * Final approval of the three drafted miracle bodies and share text.
  * Any replacement miracle titles, scripture references, images, or original Jesus.net URLs before launch.

### 4. Payload CMS + Supabase Postgres — [ARCHITECTURE SELECTED]
* **Goal**: Use Payload CMS as the admin/data layer for editable content, leads, channel preferences, consent records, referrals, delivery logs, message templates, and operational reporting.
* **Current status**:
  * Supabase connection details have been received.
  * Local `DATABASE_URL` has been stored in ignored `.env.local`.
  * The actual password is intentionally not documented or committed.
  * Full architecture and collection plan is documented in [Phase2_PayloadCMS.md](./Phase2_PayloadCMS.md).
* **What the Client Still Needs to Provide / Confirm**:
  * Confirm this Supabase database should be used for production, not only staging.
  * Add `DATABASE_URL` securely to the production hosting provider.
  * Generate and store a strong production `PAYLOAD_SECRET`.
  * Confirm who should receive Payload admin access and what roles they need.
  * Confirm backup, retention, export, and deletion policies for DPA compliance.

---

## 🟡 STAGE 2 — Messaging & Delivery Requirements

### 5. Email Marketing Platform (Brevo, ActiveCampaign, or Mailchimp)
* **Goal**: Automatically deliver daily miracles and execute the 5-day automated nurture sequences depending on whether the subscriber chose English or Tagalog.
* **Payload update**: Payload should store lead state, segments, message templates, double opt-in state, unsubscribe/suppression records, and delivery logs. The email provider still sends the actual messages.
* **What the Client Needs to Provide**:
  1. **Choice of Platform**: Account credentials or API Access to one of these services:
     * **Brevo** (Highly recommended — 300 free emails/day, low-cost scaling).
     * **Mailchimp** (Very familiar, free up to 500 subscribers).
     * **ActiveCampaign** (Best for advanced automation trees, paid-only).
  2. **API Key & List ID**: A secure developer API Key and the unique ID of the target mailing list (e.g. `Himala Every Day - PH Subscribers`).
  3. **Pre-configured Tags**: Setup three tags in the email database:
     * `himala-lang` (Values: `tl` or `en`)
     * `himala-source` (Values: `landing`, `chat`, or `referral`)
     * `himala-feeling` (Values: `lonely`, `anxious`, `grieving`, `doubting`, etc.)
  4. **Legal Compliance Setup**: Enable **Double Opt-In** emails to guarantee complete compliance with the **Philippine Data Privacy Act (DPA) of 2012**.

---

### 6. Semaphore PH SMS Gateway (Direct Mobile Delivery)
* **Goal**: Deliver a daily local text containing the title of the miracle and a short, trackable reading link directly to users' cell phones.
* **Payload update**: Payload should store phone opt-ins, verification state, explicit SMS consent, message templates, short links, Semaphore message IDs, and delivery logs.
* **Current status**:
  * Semaphore API key has been received and stored locally in `.env.local`.
  * The actual key value is intentionally not documented or committed.
  * Local sender name has been set to `HIMALA`.
* **What the Client Still Needs to Provide / Confirm**:
  1. **Production Semaphore Account Access**:
     * Confirm the API key belongs to the production Semaphore account.
     * Add the same `SEMAPHORE_API_KEY` and `SEMAPHORE_SENDER_NAME` values to the production hosting environment.
  2. **telco Sender ID Registration**:
     * Apply for a custom brand **Sender ID** (e.g., `HIMALA` or `HIMALAPH`) via the Semaphore panel.
     * > [!WARNING]
     * > **Critical Timeline Risk**: Philippine telecommunications providers (Globe, Smart, DITO) require formal corporate/ministry registry paperwork for custom Sender IDs. The telco approval cycle takes **2 to 3 weeks**. This registration must be submitted immediately to avoid delaying Stage 2 SMS features.
  3. **Starting Balance**: Load a starting balance of at least **₱500** (cost is approximately ₱0.50 per local SMS) to support development testing and initial staging.

---

### 7. Official Facebook Page Access (ManyChat Integrations)
* **Goal**: Enable chatbot triggers and automated daily messaging broadcasts directly inside Facebook Messenger.
* **What the Client Needs to Provide**:
  1. **Official Page Name / URL**: e.g., `facebook.com/himalaeveryday`.
  2. **Admin Invite**: Grant the developer's Facebook profile **Admin or Developer permissions** on the Meta Business Suite so they can connect the page to ManyChat, configure webhook endpoints, and set up automated message subscription policies.

---

### 8. Admin Dashboard
* **Goal**: Provide the ministry team with a clean admin dashboard to view signups, feelings trends, referrals, content, delivery logs, and consent status.
* **Payload update**: Payload admin is now the primary dashboard. Google Sheets/Looker Studio are optional reporting layers, not the core admin backend.
* **What the Client Needs to Provide**:
  * Payload admin users and role assignments.
  * Any required export/report fields.

---

## 🔒 Security & DPA Guidelines

To satisfy the **Philippine Data Privacy Act of 2012 (DPA)** and secure all user information:
1. **No Hardcoded Keys**: All credentials provided must be configured as **Environment Variables (`.env.local`)** on the hosting server.
2. **Double Opt-in Standard**: All email and SMS capturing requires explicit, active checkboxes stating consent, followed by a verification link.
3. **Data Control**: Payload CMS will store first-party operational data in Supabase Postgres. Access must be role-based, backed up, and governed by DPA retention/deletion policies.

---

## 🛠️ Summary `.env.local` Variables Required from Client
Once the accounts are ready, the client's technical administrator should deliver a secure file containing these keys:

```env
# --- Payload CMS / Supabase ---
DATABASE_URL=postgresql://postgres.fqyrxwiyyzruhbnrtsot:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PAYLOAD_SECRET=generate-a-strong-secret

# --- F6: Email Nurturing Engine ---
EMAIL_PLATFORM_API_KEY=your_email_platform_api_key
EMAIL_LIST_ID=your_target_mailing_list_id

# --- F7: Semaphore PH SMS Gateway (Stage 2) ---
SEMAPHORE_API_KEY=[stored securely; do not commit]
SEMAPHORE_SENDER_NAME=HIMALA
```
