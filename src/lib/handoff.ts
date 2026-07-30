export const CHANNEL_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "messenger", label: "Messenger" },
  { value: "preview", label: "Miracle Chat" },
] as const;

export type PreferredChannel = (typeof CHANNEL_OPTIONS)[number]["value"];
export type RedirectChannel = Exclude<PreferredChannel, "preview">;

export const DEFAULT_CHANNEL: RedirectChannel = "email";

const DEFAULT_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_JESUS_NET_SUBSCRIBE_URL ||
  "https://ph.jesus.net/a-miracle-every-day?utm_source=himalaeveryday&utm_medium=cta&utm_campaign=tlen_amed_2026&utm_content=himalaeveryday_cta#subscribe";

const MESSENGER_SIGNUP_URL =
  process.env.NEXT_PUBLIC_MESSENGER_SIGNUP_URL ||
  "https://www.m.me/352008124672499?text=Sign%20up";

const DEFAULT_UTM = {
  utm_source: "himalaeveryday",
  utm_medium: "cta",
  utm_campaign: "tlen_amed_2026",
  utm_content: "himalaeveryday_cta",
};

export function buildHandoffUrl(preferredChannel: RedirectChannel = DEFAULT_CHANNEL) {
  if (preferredChannel === "messenger") {
    return MESSENGER_SIGNUP_URL;
  }

  const targetUrl = new URL(DEFAULT_SUBSCRIBE_URL);
  const currentParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const utmSource = currentParams.get("utm_source") || DEFAULT_UTM.utm_source;
  const utmMedium = currentParams.get("utm_medium") || DEFAULT_UTM.utm_medium;
  const utmCampaign =
    currentParams.get("utm_campaign") || DEFAULT_UTM.utm_campaign;
  const utmContent =
    currentParams.get("utm_content") || DEFAULT_UTM.utm_content;

  targetUrl.searchParams.set("utm_source", utmSource);
  targetUrl.searchParams.set("utm_medium", utmMedium);
  targetUrl.searchParams.set("utm_campaign", utmCampaign);
  targetUrl.searchParams.set("utm_content", utmContent);
  targetUrl.hash = "subscribe";

  return targetUrl.toString();
}
