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
| **F4** | 🔴 Critical | **Tidio / ManyChat Widget ID** | empathetically engage visitors & direct to CTAs | [ ] Pending |
| **F6** | 🔴 Critical | **Email Platform API Key & List ID** | Trigger daily miracle emails & nurture sequences | [ ] Pending |
| **F7** | 🟡 Stage 2 | **Semaphore PH SMS API Key & Sender ID** | Send daily miracles via direct Philippine SMS | [ ] Pending |
| **F7 / F4** | 🟡 Stage 2 | **Facebook Page Admin Access** | Deliver daily updates via FB Messenger | [ ] Pending |
| **F7** | 🟢 Optional | **Viber Business Account** | Deliver updates via Viber (popular in Visayas/Mindanao) | [ ] Pending |

---

## 🔴 STAGE 1 — Immediate Requirements

### 1. On-site Capture (Smart Handoff) — [RESOLVED]
* **Goal**: Establish a seamless on-site capture where users enter their email and language, see a premium glassmorphic loader, and receive a beautifully animated confirmation stating that their request has been successfully sent, automatically closing the modal.
* **What the Client Needs to Provide**:
  * **None**. This is 100% frontend and code-driven. No external off-site redirect form or webhook credentials are required for this flow in Stage 1, allowing deployment to start immediately without any client configuration blockages.

---

### 2. Empathic Chatbot Widget (Tidio / ManyChat)
* **Goal**: Integrate a beautiful, warm virtual chatbot named **Miracle** that listens to users’ feelings, shares hope, and funnels them toward active subscriptions with crisis safety nets.
* **What the Client Needs to Provide**:
  1. **Tidio Widget Script ID** (Recommended for its ease of setup on the free tier):
     * Create an account on [tidio.com](https://www.tidio.com).
     * Obtain the widget script ID, which looks like: `//code.tidio.co/XXXXXXXXXX.js`.
  2. **ManyChat Page Widget (Alternative)**:
     * If the client prefers to connect directly to Facebook Messenger/Viber, create an account on [manychat.com](https://www.manychat.com) and provide the Page Widget Embed Script.
  3. **Crisis Protocols**: Verify if the standard crisis hotlines configured in our guardrail (National Center for Mental Health - NCMH: **1553**, **0917-899-8727**) are correct, or if there is a preferred, dedicated list of localized counseling hotlines/ministry partners.

---

## 🟡 STAGE 2 — Messaging & Delivery Requirements

### 4. Email Marketing Platform (Brevo, ActiveCampaign, or Mailchimp)
* **Goal**: Automatically deliver daily miracles and execute the 5-day automated nurture sequences depending on whether the subscriber chose English or Tagalog.
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

### 5. Semaphore PH SMS Gateway (Direct Mobile Delivery)
* **Goal**: Deliver a daily local text containing the title of the miracle and a short, trackable reading link directly to users' cell phones.
* **What the Client Needs to Provide**:
  1. **Active Semaphore Account API Key**: Create an account at [semaphore.co](https://semaphore.co).
  2. **telco Sender ID Registration**:
     * Apply for a custom brand **Sender ID** (e.g., `HIMALA` or `HIMALAPH`) via the Semaphore panel.
     * > [!WARNING]
     * > **Critical Timeline Risk**: Philippine telecommunications providers (Globe, Smart, DITO) require formal corporate/ministry registry paperwork for custom Sender IDs. The telco approval cycle takes **2 to 3 weeks**. This registration must be submitted immediately to avoid delaying Stage 2 SMS features.
  3. **Starting Balance**: Load a starting balance of at least **₱500** (cost is approximately ₱0.50 per local SMS) to support development testing and initial staging.

---

### 6. Official Facebook Page Access (ManyChat Integrations)
* **Goal**: Enable chatbot triggers and automated daily messaging broadcasts directly inside Facebook Messenger.
* **What the Client Needs to Provide**:
  1. **Official Page Name / URL**: e.g., `facebook.com/himalaeveryday`.
  2. **Admin Invite**: Grant the developer's Facebook profile **Admin or Developer permissions** on the Meta Business Suite so they can connect the page to ManyChat, configure webhook endpoints, and set up automated message subscription policies.

---

### 7. Admin Dashboard
* **Goal**: Provide the ministry team with a clean visual dashboard to view signups, feelings trends, and referral performance.
* **What the Client Needs to Provide**:
  * **None**. The developer will create and manage the Google Sheet backend and Looker Studio connection. The client will receive a ready-to-use dashboard link.

---

## 🔒 Security & DPA Guidelines

To satisfy the **Philippine Data Privacy Act of 2012 (DPA)** and secure all user information:
1. **No Hardcoded Keys**: All credentials provided must be configured as **Environment Variables (`.env.local`)** on the hosting server.
2. **Double Opt-in Standard**: All email and SMS capturing requires explicit, active checkboxes stating consent, followed by a verification link.
3. **Data Control**: Webhook payloads transfer email addresses directly to the client's chosen secure email platform (Brevo/ManyChat) — no localized SQL databases are deployed, completely eliminating database leak surfaces.

---

## 🛠️ Summary `.env.local` Variables Required from Client
Once the accounts are ready, the client's technical administrator should deliver a secure file containing these keys:

```env
# --- F4: Chatbot Widget ---
NEXT_PUBLIC_TIDIO_WIDGET_ID=your_tidio_script_id

# --- F6: Email Nurturing Engine ---
EMAIL_PLATFORM_API_KEY=your_email_platform_api_key
EMAIL_LIST_ID=your_target_mailing_list_id

# --- F7: Semaphore PH SMS Gateway (Stage 2) ---
SEMAPHORE_API_KEY=your_semaphore_gateway_api_key
SEMAPHORE_SENDER_NAME=HIMALA
```
