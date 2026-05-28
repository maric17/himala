export const LANGUAGE_OPTIONS = [
  { value: "tl", label: "Tagalog" },
  { value: "en", label: "English" },
] as const;

export const DEFAULT_LANGUAGE = LANGUAGE_OPTIONS[0].value;

const DEFAULT_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_JESUS_NET_SUBSCRIBE_URL ||
  "https://ph.jesus.net/a-miracle-every-day";

const DEFAULT_UTM = {
  utm_source: "himalaeveryday",
  utm_medium: "onsite_handoff",
  utm_campaign: "tlen_amed_2026",
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildHandoffUrl(
  email: string,
  language: string,
  source: string
) {
  const targetUrl = new URL(DEFAULT_SUBSCRIBE_URL);
  const currentParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const utmSource = currentParams.get("utm_source") || DEFAULT_UTM.utm_source;
  const utmMedium = currentParams.get("utm_medium") || DEFAULT_UTM.utm_medium;
  const utmCampaign =
    currentParams.get("utm_campaign") || DEFAULT_UTM.utm_campaign;
  const utmContent = currentParams.get("utm_content") || `${source}_capture`;

  targetUrl.searchParams.set("email", email.trim());
  targetUrl.searchParams.set("lang", language);
  targetUrl.searchParams.set("language", language);
  targetUrl.searchParams.set("utm_source", utmSource);
  targetUrl.searchParams.set("utm_medium", utmMedium);
  targetUrl.searchParams.set("utm_campaign", utmCampaign);
  targetUrl.searchParams.set("utm_content", utmContent);
  targetUrl.hash = "subscribe";

  return targetUrl.toString();
}
