"use client";

import { FadeIn } from "@/components/FadeIn";

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[750px] w-full flex flex-col justify-center overflow-hidden bg-brand-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75"
        >
          {/* Using the beautiful Jesus.Net Philippines local video */}
          <source src="/video/video-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay for Text Readability - inspired by Gloo UI dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-24 md:pt-32">
        <FadeIn direction="up" delay={0.2} duration={0.8} className="max-w-3xl">
          <p className="text-brand-yellow font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight text-white mb-6 leading-[1.05]">
            Jesus.Net <br /> Philippines Portal
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-light">
            Free digital tools to help you know Jesus and share Him with others.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 group">
              Get Started
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium px-8 py-4 rounded-full transition-all border border-white/20 flex items-center justify-center">
              Explore Tools
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

