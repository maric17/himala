# Module F5: Referral & "Share a Miracle" Loop — Technical Specification

This document specifies the sharing mechanism on miracle cards and the design/routing of the dynamic **"A friend sent you this" landing page** for **F5: Referral / "Share a Miracle" Loop**.

Payload CMS is now the target source of truth for miracle content, referral metadata, and referral conversion records. The current implementation uses a static content file as a launchable fallback until Payload is wired.

---

## 🎯 Objective
Establish an organic viral growth loop by letting readers share specific daily miracles in two taps. The recipient lands on a warm, highly welcoming landing page showing the shared miracle, alongside a soft inline subscription block to turn referrals into new daily subscribers.

---

## 📁 Files to Create / Modify

1. **[NEW]** `src/lib/miracle-content.ts` — Shared static source of referral-ready miracle content.
2. **[NEW]** `src/components/landing/MiracleShareButton.tsx` — Native share/copy-link button with GA event tracking.
3. **[NEW]** `src/components/landing/ReferralPageTracker.tsx` — Client-side GA tracking for referral page views.
4. **[NEW]** `src/app/(frontend)/share/[miracleId]/page.tsx` — Dynamic shared miracle landing page.
5. **[MODIFY]** `src/components/landing/SampleMiracles.tsx` — Uses shared miracle content and displays share buttons directly on the cards.

---

## ✅ Implementation Status

Implemented on 2026-05-30. UI is present as share buttons on the homepage sample miracle cards and as dynamic `/share/[miracleId]` landing pages. It is not currently a separate top-level navigation page.

### Current Referral Content

The first F5 content set is currently stored in `src/lib/miracle-content.ts` and should later migrate into the Payload `miracles` collection.

| Miracle ID | Title | Share URL |
| --- | --- | --- |
| `hes-been-thinking-about-you` | He's been thinking about YOU this whole time! | `/share/hes-been-thinking-about-you` |
| `alam-mo-ba-ang-mga-sugat-ni-jesus` | Alam mo ba ang mga sugat na tinanggap ni Jesus? | `/share/alam-mo-ba-ang-mga-sugat-ni-jesus` |
| `alam-mo-ba-ang-pinagdaanan-ni-jesus` | Alam mo ba ang pinagdaanan ni Jesus? | `/share/alam-mo-ba-ang-pinagdaanan-ni-jesus` |

Each content item includes:

- `id`
- `date`
- `image`
- `title`
- `excerpt`
- `body`
- `scripture`
- `originalUrl`
- `shareText`

### Current Behavior

- Homepage sample miracle cards now render from `miracleContent`.
- Each card keeps a "Read this miracle" link to the original `ph.jesus.net` miracle page.
- Each card includes a `MiracleShareButton`.
- On supported mobile/desktop browsers, sharing uses the native Web Share API.
- On browsers without native share support, sharing falls back to copying `/share/[miracleId]` to the clipboard.
- If clipboard access is unavailable, the user gets a prompt containing the share URL.
- The referral landing page shows the selected miracle image, title, body, scripture, original Jesus.net link, share button, and inline capture form.
- The referral capture form uses `source="friend_referral"` and continues through the existing F1 handoff flow.
- Target state: `/share/[miracleId]` loads the miracle by Payload slug and records referral activity in Payload.

### Analytics Events

- `miracle_shared`
  - Fired from `MiracleShareButton`.
  - Includes `method`, `content_type`, and `item_id`.
- `referral_page_viewed`
  - Fired from `ReferralPageTracker`.
  - Includes `content_type` and `item_id`.
- Referral capture submits use the existing F1 `cta_clicked`, `handoff_started`, and `handoff_success` events with `cta_location: friend_referral`.

### Where to See It in the UI

- Homepage section: `Read Now` / sample miracles.
- UI entry point: the `Share` button on each miracle card.
- Shared destination: `/share/[miracleId]`.
- Current client-facing status: UI is implemented but still pending content approval, manual share QA, analytics QA, and Payload migration.

Screenshots:

- Homepage share buttons: `docs/phase-2/screenshots/phase2-f5-share-buttons-ui-2026-06-05.png`
- Referral landing page: `docs/phase-2/screenshots/phase2-f5-referral-page-2026-06-05.png`

### Payload Collections

Recommended collections:

- `miracles`: title, slug, body, excerpt, scripture, image, original URL, share text, language, status.
- `referrals`: miracle, share method, landing path, referrer lead, converted lead, timestamps, UTM values.
- `events`: `miracle_shared`, `referral_page_viewed`, `referral_handoff_started`, `referral_converted`.

Migration path:

1. Seed current static miracles into Payload.
2. Update homepage cards to fetch published miracles from Payload.
3. Update `/share/[miracleId]` to load by Payload slug.
4. Write share and referral conversion events to Payload server-side.
5. Keep static file fallback for build-time resilience if needed.

### Verification Status

- `npm run lint`: passed on 2026-05-30.
- `npm exec tsc -- --noEmit`: passed on 2026-05-30.
- `npm run build`: latest 2026-05-30 attempt hung during the Turbopack optimized production build and was stopped. Needs a clean re-run.
- Manual mobile/desktop share QA: pending.
- Manual referral capture and analytics QA: pending.

## 🛠️ Step-by-Step Code Specifications

> Note: The original implementation outline below is retained as reference. The actual implementation uses the files and behavior listed above.

### 1. Dynamic Shared Page (`src/app/(frontend)/share/[miracleId]/page.tsx`)
Create a dynamic App Router route. The current implementation renders from a shared static array; the target implementation should fetch the miracle from Payload by slug.

```tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Mail, HeartHandshake } from "lucide-react";
import HeroForm from "@/components/landing/HeroForm"; // Reusable form from F1/F2

// Static metadata/content mock database
interface Miracle {
  id: string;
  title: string;
  body: string;
  scripture: string;
}

const MIRACLES_DB: Record<string, Miracle> = {
  "hindi-ka-nag-iisa": {
    id: "hindi-ka-nag-iisa",
    title: "Hindi Ka Nag-iisa",
    body: "Tandaan mo na sa gitna ng bagyo ng buhay, may isang Ama na hindi kailanman umaalis sa iyong tabi. Dinirinig Niya ang iyong mga hikbi, at hinahawakan Niya ang iyong bukas.",
    scripture: "Isaias 41:10 - Huwag kang matakot, sapagkat ako'y sumasainyo."
  },
  "pag-asa-sa-umaga": {
    id: "pag-asa-sa-umaga",
    title: "Pag-asa sa Bawat Umaga",
    body: "Ang bawat pagsikat ng araw ay patunay ng Kanyang walang-hanggang katapatan. Kung nabigo ka man kahapon, may bagong grasya at lakas na naghihintay sa iyo ngayong araw.",
    scripture: "Mga Panaghoy 3:22-23 - Ang pag-ibig ni Yahweh ay hindi natatapos."
  }
};

export async function generateMetadata({ params }: { params: { miracleId: string } }): Promise<Metadata> {
  const miracle = MIRACLES_DB[params.miracleId] || MIRACLES_DB["hindi-ka-nag-iisa"];
  return {
    title: `Isang Milagro para sa Iyo: "${miracle.title}"`,
    description: `Isang kaibigan ang nagbahagi ng mensaheng ito ng pag-asa sa iyo ngayong araw.`,
  };
}

export default function SharedMiraclePage({ params }: { params: { miracleId: string } }) {
  const miracle = MIRACLES_DB[params.miracleId] || MIRACLES_DB["hindi-ka-nag-iisa"];

  return (
    <main className="min-h-screen bg-background-cream text-brand-brown py-16 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-brand-gold/20 shadow-xl text-center">
        
        {/* Welcome Header */}
        <div className="flex items-center justify-center gap-2 text-brand-gold mb-6">
          <HeartHandshake className="w-8 h-8 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold font-sans">
            Inihandog ng iyong Kaibigan / Sent by a Friend
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark-brown mb-4">
          {miracle.title}
        </h1>
        
        <p className="text-sm text-brand-gold/90 font-semibold mb-8 font-sans">
          {miracle.scripture}
        </p>

        <p className="text-base md:text-lg leading-relaxed text-brand-brown/90 mb-10 font-serif italic">
          "{miracle.body}"
        </p>

        <hr className="border-brand-gold/20 my-8" />

        {/* Dynamic Soft Invite Capture Block */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-brand-dark-brown">
            Gusto mo ba ng ganitong pag-asa tuwing umaga?
          </h3>
          <p className="text-xs text-brand-brown/70 max-w-md mx-auto mb-6">
            Sumali sa mahigit libu-libong Pilipino na nagsisimula ng kanilang araw nang may lakas, kapayapaan, at gabay ng Diyos—direkta sa iyong email o Messenger.
          </p>
          
          {/* Email capture redirect inline form */}
          <div className="max-w-md mx-auto">
            <HeroForm inline={true} source="friend_referral" />
          </div>
        </div>

      </div>
    </main>
  );
}
```

---

### 2. Card Level Share Buttons (`SampleMiracles.tsx`)
Incorporate an actionable web-share trigger on the card elements:

```tsx
"use client";

import React from "react";
import { Share2, Link2 } from "lucide-react";

interface ShareProps {
  miracleId: string;
  title: string;
}

export default function ShareButtons({ miracleId, title }: ShareProps) {
  const referralUrl = `${window.location.origin}/share/${miracleId}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Himala: ${title}`,
          text: "Basahin mo ito. May magandang mensahe ang Diyos para sa iyo ngayong araw.",
          url: referralUrl,
        });
        
        // Log to GA4
        if ((window as any).gtag) {
          (window as any).gtag("event", "share", {
            method: "web_share_api",
            content_type: "miracle_card",
            item_id: miracleId,
          });
        }
      } catch (err) {
        console.log("User cancelled share or encounter error", err);
      }
    } else {
      // Fallback copy link
      navigator.clipboard.writeText(referralUrl);
      alert("Kopyado na ang referral link! Ibahagi ito sa iyong kaibigan.");
    }
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-gold/30 text-xs font-bold text-brand-brown hover:bg-brand-gold/10 transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Ibahagi sa Kaibigan / Share with a Friend
      </button>
    </div>
  );
}
```

---

## 🧪 Manual Verification Instructions
1. Hover/Click a card in the `SampleMiracles` module and click "Ibahagi sa Kaibigan".
2. On mobile, confirm it opens the native system share drawer. On desktop, verify it copies the URL `http://localhost:3000/share/[miracle-id]` to the clipboard.
3. Open a separate tab, paste the copied link.
4. **Expected Behavior**: A dedicated, beautifully formatted message page appears displaying the specific miracle body, with the invite block pre-filled, sending leads to the F1 redirection funnel upon click.
