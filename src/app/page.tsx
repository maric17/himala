"use client";

import React from "react";
import Hero from "@/components/landing/Hero";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-background-cream">
      <Hero />
      <Marquee />
      <CardCarouselSection />
      <StatsRibbon />
      <DailyMiracleInfo />
      <Testimonials />
      <SampleMiracles />
      <HowItWorks />
      <HumansBehind />
      <TheApp />
      <FinalCTA />
    </main>
  );
}
