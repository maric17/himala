"use client";

import React, { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MiracleShareButtonProps {
  miracleId: string;
  title: string;
  text: string;
  shareUrl?: string;
  className?: string;
}

export default function MiracleShareButton({
  miracleId,
  title,
  text,
  shareUrl,
  className = "",
}: MiracleShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const referralUrl = shareUrl ?? `${window.location.origin}/share/${miracleId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Himala Every Day: ${title}`,
          text,
          url: referralUrl,
        });

        trackEvent("miracle_shared", {
          method: "web_share_api",
          content_type: "miracle_card",
          item_id: miracleId,
        });
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(referralUrl);
    } else {
      window.prompt("Copy this miracle link:", referralUrl);
    }

    setCopied(true);
    trackEvent("miracle_shared", {
      method: "copy_link",
      content_type: "miracle_card",
      item_id: miracleId,
    });

    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-brand-brown/10 bg-background-cream px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-brown transition-colors hover:border-brand-gold hover:text-brand-gold ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Link copied
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </button>
  );
}
