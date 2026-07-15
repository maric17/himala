import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, HeartHandshake, Mail } from "lucide-react";
import { LandingCaptureProvider } from "@/components/landing/CaptureProvider";
import CaptureForm from "@/components/landing/CaptureForm";
import MiracleShareButton from "@/components/landing/MiracleShareButton";
import ReferralPageTracker from "@/components/landing/ReferralPageTracker";
import { getMiracleById, miracleContent } from "@/lib/miracle-content";

interface SharedMiraclePageProps {
  params: Promise<{
    miracleId: string;
  }>;
}

export function generateStaticParams() {
  return miracleContent.map((miracle) => ({
    miracleId: miracle.id,
  }));
}

export async function generateMetadata({
  params,
}: SharedMiraclePageProps): Promise<Metadata> {
  const { miracleId } = await params;
  const miracle = getMiracleById(miracleId);

  if (!miracle) {
    return {
      title: "Shared Miracle - Himala Every Day",
    };
  }

  return {
    title: `${miracle.title} - Himala Every Day`,
    description:
      "A friend sent you a short daily miracle of hope from Himala Every Day.",
    openGraph: {
      title: miracle.title,
      description: miracle.excerpt,
      images: [miracle.image],
      type: "article",
    },
  };
}

export default async function SharedMiraclePage({
  params,
}: SharedMiraclePageProps) {
  const { miracleId } = await params;
  const miracle = getMiracleById(miracleId);

  if (!miracle) {
    notFound();
  }

  return (
    <LandingCaptureProvider>
      <ReferralPageTracker miracleId={miracle.id} />
      <main className="bg-background-cream pt-28">
        <section className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:py-20">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[40px] bg-brand-dark-brown shadow-[0_30px_80px_rgba(26,18,14,0.16)]">
            <Image
              src={miracle.image}
              alt={miracle.title}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-[0.82]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,14,0.08)_0%,rgba(26,18,14,0.72)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {miracle.date}
              </p>
              <h1 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
                {miracle.title}
              </h1>
            </div>
          </div>

          <div>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-brown/55 transition-colors hover:text-brand-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Himala Every Day
            </Link>

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand-gold/25 bg-white px-4 py-2 text-brand-brown shadow-sm">
              <HeartHandshake className="h-4 w-4 text-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                A friend sent you this
              </span>
            </div>

            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              Today&apos;s shared miracle
            </p>
            <blockquote className="font-serif text-2xl leading-relaxed text-brand-brown md:text-3xl">
              {miracle.body}
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-brand-brown/54">
              {miracle.scripture}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={miracle.originalUrl}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-dark-brown px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-brown"
              >
                Read on Jesus.net
              </a>
              <MiracleShareButton
                miracleId={miracle.id}
                title={miracle.title}
                text={miracle.shareText}
                className="bg-white"
              />
            </div>
          </div>
        </section>

        <section className="bg-brand-dark-brown px-6 py-20 text-white">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/12 text-brand-gold ring-1 ring-brand-gold/20">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-4xl leading-tight">
                Want this kind of hope every morning?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                Join Himala Every Day and receive one short reflection in
                Tagalog or English, sent through your chosen channel.
              </p>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/8 p-5 backdrop-blur-2xl sm:p-6">
              <CaptureForm
                source="friend_referral"
                variant="compact"
                submitLabel="Send Me Daily Miracles"
                helperText="Free forever. You will continue directly to the sign-up destination you choose."
              />
            </div>
          </div>
        </section>
      </main>
    </LandingCaptureProvider>
  );
}
