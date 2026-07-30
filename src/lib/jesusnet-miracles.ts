export type JesusNetMiracleCard = {
  title: string;
  description: string;
  url: string;
  image: string;
};

const PH_MIRACLES_URL = "https://ph.jesus.net/miracles";
const MIRACLE_DESCRIPTION =
  "A daily miracle from ph.Jesus.net for wherever you are in your story.";
const MIRACLE_CARD_IMAGES = [
  "/images/churches/11a2f2b0-b80c-49ef-9def-feb61d488095___media_library_original_420_675.webp",
  "/images/churches/36c813cf-8199-4d41-83f8-a98ce3d32589___media_library_original_420_675.webp",
  "/images/churches/354f496c-4b8d-46aa-b832-81a5feeba8d4___media_library_original_420_675.webp",
  "/images/churches/d82b5088-ca46-4d94-87db-f96166242ecf___media_library_original_420_675.webp",
];

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  ldquo: '"',
  lsquo: "'",
  mdash: "-",
  ndash: "-",
  quot: '"',
  rdquo: '"',
  rsquo: "'",
};

export function cleanJesusNetTitle(title: string): string {
  return decodeHtmlEntities(title)
    .replace(/\s*-\s*(?:ph\.)?Jesus\.net\s*$/i, "")
    .trim();
}

export function parseMiracleCardsFromListingHtml(
  html: string,
  limit = 4,
): Pick<JesusNetMiracleCard, "title" | "url">[] {
  const cards: Pick<JesusNetMiracleCard, "title" | "url">[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    const href = getAttributeValue(tag, "href");
    const title = getAttributeValue(tag, "title");

    if (!href || !title) {
      continue;
    }

    try {
      const url = new URL(href);
      const isPhMiracle =
        url.hostname === "ph.jesus.net" &&
        /^\/miracles\/[^/?#]+\/?$/.test(url.pathname);

      if (isPhMiracle && !seen.has(url.href)) {
        cards.push({
          title: cleanJesusNetTitle(title),
          url: url.href,
        });
        seen.add(url.href);
      }
    } catch {
      continue;
    }

    if (cards.length >= limit) {
      break;
    }
  }

  return cards;
}

export async function fetchJesusNetMiracleCards(): Promise<JesusNetMiracleCard[]> {
  try {
    const listingResponse = await fetch(PH_MIRACLES_URL, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!listingResponse.ok) {
      return [];
    }

    const listing = (await listingResponse.json()) as { html?: string };
    const miracleCards = parseMiracleCardsFromListingHtml(listing.html ?? "");

    return miracleCards.map((card, index) => ({
      title: card.title,
      description: MIRACLE_DESCRIPTION,
      url: card.url,
      image: MIRACLE_CARD_IMAGES[index % MIRACLE_CARD_IMAGES.length],
    }));
  } catch {
    return [];
  }
}

function getAttributeValue(tag: string, attribute: string): string | undefined {
  const match = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));

  if (!match) {
    return undefined;
  }

  return decodeHtmlEntities(match[1].replace(/\\\//g, "/"));
}

function decodeHtmlEntities(value: string): string {
  return value.replace(
    /&(#x?[0-9a-f]+|[a-z]+);/gi,
    (entity, code: string) => {
      if (code.startsWith("#x")) {
        return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
      }

      if (code.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
      }

      return HTML_ENTITIES[code.toLowerCase()] ?? entity;
    },
  );
}
