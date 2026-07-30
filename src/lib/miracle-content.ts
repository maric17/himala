export interface MiracleContent {
  id: string;
  date: string;
  image: string;
  title: string;
  excerpt: string;
  body: string;
  scripture: string;
  originalUrl: string;
  shareText: string;
}

export const miracleContent: MiracleContent[] = [
  {
    id: "hes-been-thinking-about-you",
    date: "MAR 26",
    image:
      "/images/churches/11a2f2b0-b80c-49ef-9def-feb61d488095___media_library_original_420_675.webp",
    title: "He's been thinking about YOU this whole time!",
    excerpt: "A reminder of God's constant presence and love for you.",
    body:
      "Before you knew how today would feel, God already saw you with tenderness. You are not an afterthought. You are remembered, held, and invited to breathe again. Let this be your small miracle today: the God who made the morning has not stopped thinking about you.",
    scripture: "Psalm 139:17 - How precious are your thoughts about me, O God.",
    originalUrl:
      "https://ph.jesus.net/miracles/hes-been-thinking-about-you-this-whole-time",
    shareText:
      "I thought this short miracle might encourage you today. You are not forgotten.",
  },
  {
    id: "alam-mo-ba-ang-mga-sugat-ni-jesus",
    date: "MAR 25",
    image:
      "/images/churches/36c813cf-8199-4d41-83f8-a98ce3d32589___media_library_original_420_675.webp",
    title: "Alam mo ba ang mga sugat na tinanggap ni Jesus?",
    excerpt: "Reflecting on the sacrifice that changed everything.",
    body:
      "May mga sugat na tahimik lang nating dinadala. Pero kay Jesus, ang mga sugat Niya ay naging tanda ng pagmamahal, hindi pagkatalo. Kapag pakiramdam mo mabigat ang dala mo, alalahanin mo ito: may Tagapagligtas na lumapit sa sakit para mailapit ka sa pag-asa.",
    scripture: "Isaiah 53:5 - By his wounds we are healed.",
    originalUrl:
      "https://ph.jesus.net/miracles/alam-mo-ba-ang-mga-sugat-na-tinanggap-ni-jesus",
    shareText:
      "May mensahe ito tungkol sa pag-asa at pagmamahal ni Jesus. Baka kailangan mo rin ngayon.",
  },
  {
    id: "alam-mo-ba-ang-pinagdaanan-ni-jesus",
    date: "MAR 24",
    image:
      "/images/churches/354f496c-4b8d-46aa-b832-81a5feeba8d4___media_library_original_420_675.webp",
    title: "Alam mo ba ang pinagdaanan ni Jesus?",
    excerpt: "A journey through the path that leads to hope.",
    body:
      "Hindi malayo si Jesus sa hirap ng tao. Alam Niya ang pagod, pag-iisa, pagtataksil, at bigat ng loob. Kaya kapag hindi mo maipaliwanag ang pinagdadaanan mo, puwede kang lumapit sa Kanya nang walang pagpapanggap. Naiintindihan ka Niya, at hindi ka Niya iiwan sa gitna ng daan.",
    scripture: "Hebrews 4:15 - We have one who understands our weaknesses.",
    originalUrl:
      "https://ph.jesus.net/miracles/alam-mo-ba-ang-pinagdaanan-ni-jesus",
    shareText:
      "This reminded me that Jesus understands what we go through. Sharing it with you.",
  },
];

export function getMiracleById(id: string) {
  return miracleContent.find((miracle) => miracle.id === id);
}
