"use client";

import React from "react";
import { LandingCaptureProvider } from "@/components/landing/CaptureProvider";
import FAQAccordion from "@/components/landing/FAQAccordion";
import Hero from "@/components/landing/Hero";
import LiveFeed from "@/components/landing/LiveFeed";
import Marquee from "@/components/landing/Marquee";
import CardCarouselSection from "@/components/landing/CardCarouselSection";
import StatsRibbon from "@/components/landing/StatsRibbon";
import DailyMiracleInfo from "@/components/landing/DailyMiracleInfo";
import Testimonials from "@/components/landing/Testimonials";
import SampleMiracles from "@/components/landing/SampleMiracles";
import HowItWorks from "@/components/landing/HowItWorks";
import HumansBehind from "@/components/landing/HumansBehind";
import TheApp from "@/components/landing/TheApp";
import FinalCTA from "@/components/landing/FinalCTA";
import StickyCTA from "@/components/landing/StickyCTA";

export default function Home() {
  return (
    <LandingCaptureProvider>
      <main className="min-h-screen bg-background-cream">
        <Hero />
        <LiveFeed />
        <Marquee />
        <CardCarouselSection />
        <StatsRibbon />
        <DailyMiracleInfo />
        <Testimonials />
        <SampleMiracles />
        <HowItWorks />
        <HumansBehind />
        <TheApp />
        <FAQAccordion />
        <FinalCTA />
        <StickyCTA />
      </main>
    </LandingCaptureProvider>
  );
}
