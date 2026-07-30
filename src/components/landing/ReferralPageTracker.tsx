"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface ReferralPageTrackerProps {
  miracleId: string;
}

export default function ReferralPageTracker({
  miracleId,
}: ReferralPageTrackerProps) {
  useEffect(() => {
    trackEvent("referral_page_viewed", {
      content_type: "miracle_share_page",
      item_id: miracleId,
    });
  }, [miracleId]);

  return null;
}
