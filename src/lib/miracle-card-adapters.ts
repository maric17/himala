import type { JesusNetMiracleCard } from "@/lib/jesusnet-miracles";

export type SampleMiraclePreview = {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  originalUrl: string;
  shareText: string;
  shareUrl?: string;
};

const SAMPLE_SHARE_TEXT =
  "I thought this short miracle might encourage you today. Sharing it with you.";

export function toSampleMiraclePreviews(
  cards: JesusNetMiracleCard[],
  limit = 3,
): SampleMiraclePreview[] {
  return cards.slice(0, limit).map((card) => ({
    id: getSlugFromUrl(card.url),
    image: card.image,
    title: card.title,
    excerpt: card.description,
    originalUrl: card.url,
    shareText: SAMPLE_SHARE_TEXT,
    shareUrl: card.url,
  }));
}

function getSlugFromUrl(value: string): string {
  try {
    const url = new URL(value);
    const slug = url.pathname.split("/").filter(Boolean).at(-1);

    return slug || "miracle";
  } catch {
    return "miracle";
  }
}
