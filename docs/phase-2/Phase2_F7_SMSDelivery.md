# Module F7: SMS & Messaging Delivery — Technical Specification

This document specifies the messaging channel choices, Semaphore SMS API implementation, Messenger automation routing, and budget controls for **F7: SMS / Messaging Delivery**.

---

## 🎯 Objective
Let users receive their daily miracle on mobile channels where they are most active (such as Facebook Messenger, Viber, or True SMS). Setup direct programmatic integrations with PH SMS Gateways to deliver links quickly and at a minimal cost.

With Payload CMS, F7 should store channel preference, explicit SMS consent, phone verification state, short links, and Semaphore delivery logs before any production SMS sending.

---

## 📁 Files to Create / Modify

1. **[NEW]** [sms-sender.ts](file:///c:/RepoOutside/himala/src/lib/sms-sender.ts) — The Semaphore/Movider API client utility.
2. **[MODIFY]** [Hero.tsx](file:///c:/RepoOutside/himala/src/components/landing/Hero.tsx) — Add Messenger / Viber / SMS channel toggle selectors.

---

## ✅ Implementation Status

Partially prepared on 2026-05-30.

### Completed

- Received the Semaphore API key from the client.
- Stored `SEMAPHORE_API_KEY` in local `.env.local`.
- Set local `SEMAPHORE_SENDER_NAME=HIMALA`.
- Confirmed `.env.local` is covered by the existing `.gitignore` `.env*` rule.

### Still Pending

- Add the same Semaphore env vars to the production hosting provider.
- Confirm the Semaphore production account has SMS credits.
- Register or confirm the production Sender ID.
- Add Payload collections for phone opt-ins, short links, and delivery logs.
- Implement `src/lib/sms-sender.ts`.
- Add short redirect routes such as `/m/[id]` before sending production SMS links.
- Add explicit SMS opt-in and verification before any automated sending.
- Manually test one controlled SMS send only after account balance, Sender ID, and consent flow are confirmed.

## 🛠️ Step-by-Step Code Specifications

### 1. Phased Messaging Strategy
To minimize operating costs and bureaucratic paperwork (e.g., PH telco sender ID registrations), we deploy a phased channel approach:

* **Phase 1 (Immediate & Free)**: **Messenger / Viber**. Users opting for messaging are directed to opt-in directly inside ManyChat/Bonfire. They receive daily messages inside Facebook Messenger or Viber automatically with **zero telco delivery costs**.
* **Phase 2 (True SMS Upgrade)**: Programmatic gateway integration for direct SMS delivery.

---

### 2. PH SMS Gateway Integration (`sms-sender.ts`)
Create a utility in `src/lib/sms-sender.ts` that triggers SMS alerts using **Semaphore** (a top-tier, low-cost PH SMS gateway provider).

```typescript
/**
 * PH SMS Gateway Client (Semaphore)
 * Cost per SMS: ~PHP 0.50 (Standard local rate)
 */
export async function sendDailyMiracleSMS(
  phoneNumber: string,
  miracleTitle: string,
  linkId: string,
  language: string
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  
  const apiKey = process.env.SEMAPHORE_API_KEY;
  const senderName = process.env.SEMAPHORE_SENDER_NAME || "Himala"; // Registered SenderID

  if (!apiKey) {
    return { success: false, error: "Missing Semaphore API Key in server variables." };
  }

  // Keep character count below 160 to prevent double-billing
  const bodyText = language === "tl"
    ? `Himala: "${miracleTitle}"\nAng iyong milagro ngayong araw ay naghihintay sa iyo. Basahin dito: himalaeveryday.ph/m/${linkId}`
    : `Himala: "${miracleTitle}"\nYour daily miracle of hope is waiting. Read here: himalaeveryday.ph/m/${linkId}`;

  try {
    const response = await fetch("https://api.semaphore.co/api/v4/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        apikey: apiKey,
        number: phoneNumber,
        message: bodyText,
        sendername: senderName,
      }),
    });

    const result = await response.json();

    if (response.ok && result.length > 0) {
      return { success: true, messageId: result[0].message_id };
    } else {
      return { success: false, error: result.error || "SMS delivery rejected by Semaphore gateway." };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "Network exception sending SMS." };
  }
}
```

---

### 3. cost-containment Rules
Sending thousands of SMS broadcasts per day can become costly. The following safeguards must be strictly configured:

1. **SMS Length Constraints**: All messages must fit under **160 characters** (including the URL link) to count as a single billing unit. Avoid spelling out full scripture verses in the text; only send the Title and short URL link.
2. **Short URLs**: Implement short redirects inside Next.js (e.g. `/m/[id]` which redirects to `/share/[id]`) to shave characters off the URL.
3. **Double Opt-in confirmation**: Users must verify their number via an initial opt-in text before the daily cron task adds them to the automated queue, avoiding wasting money sending texts to fake or inactive phone numbers.

---

## Payload CMS Integration

Recommended Payload collections:

- `leads`: phone, preferred channel, SMS consent, verification state.
- `messageTemplates`: SMS body templates by language.
- `shortLinks`: short `/m/[id]` redirects to miracle/share pages.
- `deliveryLogs`: Semaphore message ID, status, error, sent time, delivered time.
- `events`: `sms_opt_in_started`, `sms_verified`, `sms_sent`, `sms_failed`.

Recommended SMS flow:

1. User selects `SMS` as preferred channel.
2. User enters phone number and actively checks SMS consent.
3. Server creates/updates a Payload `lead`.
4. Server sends one verification SMS through Semaphore.
5. User verifies ownership.
6. Payload marks `smsVerified=true`.
7. Only verified leads enter daily SMS delivery.
