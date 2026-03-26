"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  BookHeart, 
  Film, 
  PlayCircle, 
  Video, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";

const TOOLS = [
  {
    name: "Himala Every day",
    description: "Daily devotionals in Filipino that bring Scripture to life with practical reflections for your everyday walk with God.",
    url: "https://ph.jesus.net/a-miracle-every-day",
    displayUrl: "ph.jesus.net/a-miracle-every-day",
    icon: BookHeart,
    image: "/images/tools/himala.png",
  },
  {
    name: "MyJourney with The Chosen",
    description: "Interactive Bible study companion for The Chosen series. Watch episodes and dive deeper into Scripture together.",
    url: "https://myjourney.ph.jesus.net/",
    displayUrl: "myjourney.ph.jesus.net",
    icon: Film,
    image: "/images/tools/my-journey.png",
  },
  {
    name: "The Life of Jesus Film",
    description: "Full-length film depicting the life of Jesus, available for screenings in churches, communities, and public venues.",
    url: "https://www.youtube.com/watch?v=DYBZQHLFHqs",
    displayUrl: "www.youtube.com/watch?v=DYBZQHLFHqs",
    icon: Video,
    image: "/images/tools/jesus-film.png",
  },
  {
    name: "The Chosen Series",
    description: "Stream The Chosen for free—the groundbreaking series about Jesus and His disciples that's changing hearts worldwide.",
    url: "https://ph.jesus.net/films-and-series/the-chosen",
    displayUrl: "ph.jesus.net/films-and-series/the-chosen",
    icon: PlayCircle,
    image: "/images/tools/the-chosen.png",
  },
];

export default function FreeTools() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: "start",
      dragFree: true,
      loop: true,
      skipSnaps: false
    },
    [Autoplay({ delay: 8000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Doubling ensures smooth loop for few items
  const displayTools = [...TOOLS, ...TOOLS];

  return (
    <section className="py-24 bg-brand-light w-full text-brand-black overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <FadeIn direction="up" className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-black">
            Our <span className="font-light">Free Tools</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-black/70 font-medium leading-relaxed">
            A growing library of digital resources designed to help you know Jesus and share Him.
          </p>
        </FadeIn>

        <div className="flex gap-3">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border-2 border-brand-black/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:text-white cursor-pointer active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border-2 border-brand-black/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:text-white cursor-pointer active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="w-full relative px-6 md:px-12">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 -ml-3">
            {displayTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={`${tool.name}-${index}`} 
                  className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_32%] pl-3 min-w-0"
                >
                  <div className="h-full relative overflow-hidden rounded-3xl group transition-all duration-500 shadow-2xl shadow-black/20 border border-white/5">
                    {/* Background Image with Dark Overlay */}
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" 
                      style={{ backgroundImage: `url(${tool.image})` }}
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-black via-brand-black/95 to-brand-black/40 group-hover:via-brand-black/80 transition-colors duration-500" />

                    {/* Content */}
                    <div className="relative z-20 h-full p-8 md:p-10 flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                        <div className="p-4 bg-brand-yellow rounded-2xl text-brand-black group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-brand-yellow/10">
                          <Icon className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
                        {tool.name}
                      </h3>
                      
                      <p className="text-white/60 mb-10 text-[16px] md:text-lg font-light leading-relaxed flex-grow">
                        {tool.description}
                      </p>
                      
                      <Link 
                        href={tool.url}
                        target="_blank"
                        className="mt-auto inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl bg-brand-yellow text-brand-black font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-95"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-12">
        {TOOLS.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              selectedIndex % TOOLS.length === index
                ? "w-8 bg-brand-black" 
                : "w-2 bg-brand-black/20 hover:bg-brand-black/40"
            )}
            aria-label={`Go to tool ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
