"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CardCarouselSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: true
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(onSelect);
    
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);


  return (
    <section id="your-story" className="py-24 bg-background-cream overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left"
      >
        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
          <div className="w-8 h-[1px] bg-brand-gold"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Turn the page</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight max-w-2xl">
            Wherever you are in your story — there&apos;s a page here for you.
          </h2>
          <div className="flex gap-4">
             <button 
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all text-brand-brown/40 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-brown/40"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all text-brand-brown/40 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-brown/40"
             >
               <ChevronRight size={20} />
             </button>
          </div>
        </div>
        <p className="mt-8 text-brand-brown/50 max-w-md">Swipe through. Each one was written for a real moment in someone&apos;s life. Maybe it&apos;s yours right now.</p>
      </motion.div>
      
      {/* Embla Viewport */}
      <div className="overflow-hidden px-6 pb-12" ref={emblaRef}>
        <div className="flex gap-6">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-[0_0_85vw] md:flex-[0_0_400px] h-[480px] bg-brand-dark-brown rounded-[40px] p-8 md:p-10 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl group border border-white/5"
          >
            <Image 
                src="/images/churches/11a2f2b0-b80c-49ef-9def-feb61d488095___media_library_original_420_675.webp"
                alt="He's been thinking about YOU"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-brown via-brand-dark-brown/40 to-transparent z-0"></div>
            
            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/10 w-fit backdrop-blur-sm px-4 py-1 rounded-full mb-6 text-brand-gold">March 26, 2026</div>
                <h3 className="text-3xl font-serif mb-4 leading-tight italic">He&apos;s been thinking about YOU this whole time!</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">A reminder of God&apos;s constant presence and love for you.</p>
                <a href="https://ph.jesus.net/miracles/hes-been-thinking-about-you-this-whole-time"  rel="noopener noreferrer" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read miracle <ArrowRight size={14} /></a>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-[0_0_85vw] md:flex-[0_0_400px] h-[480px] bg-brand-dark-brown rounded-[40px] p-8 md:p-10 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl group border border-white/5"
          >
            <Image 
                src="/images/churches/36c813cf-8199-4d41-83f8-a98ce3d32589___media_library_original_420_675.webp"
                alt="Mga sugat na tinanggap ni Jesus"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-brown via-brand-dark-brown/40 to-transparent z-0"></div>
            
            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/10 w-fit backdrop-blur-sm px-4 py-1 rounded-full mb-6 text-brand-gold">March 25, 2026</div>
                <h3 className="text-3xl font-serif mb-4 leading-tight italic">Alam mo ba ang mga sugat na tinanggap ni Jesus?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">Reflecting on the sacrifice that changed everything.</p>
                <a href="https://ph.jesus.net/miracles/alam-mo-ba-ang-mga-sugat-na-tinanggap-ni-jesus"  rel="noopener noreferrer" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read miracle <ArrowRight size={14} /></a>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-[0_0_85vw] md:flex-[0_0_400px] h-[480px] bg-brand-dark-brown rounded-[40px] p-8 md:p-10 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl group border border-white/5"
          >
            <Image 
                src="/images/churches/354f496c-4b8d-46aa-b832-81a5feeba8d4___media_library_original_420_675.webp"
                alt="Pinagdaanan ni Jesus"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-brown via-brand-dark-brown/40 to-transparent z-0"></div>
            
            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/10 w-fit backdrop-blur-sm px-4 py-1 rounded-full mb-6 text-brand-gold">March 24, 2026</div>
                <h3 className="text-3xl font-serif mb-4 leading-tight italic">Alam mo ba ang pinagdaanan ni Jesus?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">A journey through the path that leads to hope.</p>
                <a href="https://ph.jesus.net/miracles/alam-mo-ba-ang-pinagdaanan-ni-jesus"  rel="noopener noreferrer" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read miracle <ArrowRight size={14} /></a>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-[0_0_85vw] md:flex-[0_0_400px] h-[480px] bg-brand-dark-brown rounded-[40px] p-8 md:p-10 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl group border border-white/5"
          >
            <Image 
                src="/images/churches/d82b5088-ca46-4d94-87db-f96166242ecf___media_library_original_420_675.webp"
                alt="Bakit kailangan ang cross"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-brown via-brand-dark-brown/40 to-transparent z-0"></div>
            
            <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest bg-white/10 w-fit backdrop-blur-sm px-4 py-1 rounded-full mb-6 text-brand-gold">March 23, 2026</div>
                <h3 className="text-3xl font-serif mb-4 leading-tight italic">Bakit nga ba kailangan ang cross?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">Understanding the profound necessity of the cross.</p>
                <a href="https://ph.jesus.net/miracles/bakit-nga-ba-kailangan-ang-cross"  rel="noopener noreferrer" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read miracle <ArrowRight size={14} /></a>
            </div>
          </motion.div>


          {/* View All Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-[0_0_85vw] md:flex-[0_0_400px] h-[480px] bg-white border border-brand-gold/20 rounded-[40px] p-8 md:p-10 shrink-0 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl group"
          >
            <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                <ArrowRight size={32} />
            </div>
            <h3 className="text-3xl font-serif text-brand-brown mb-4 leading-tight">Explore 3,000+ daily miracles.</h3>
            <p className="text-brand-brown/50 text-sm leading-relaxed mb-10 max-w-[240px]">There is a story waiting for you. Browse our entire collection of hope.</p>
            <a 
                href="https://ph.jesus.net/miracles" 
                rel="noopener noreferrer"
                className="bg-brand-brown text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-brand-gold transition-colors"
            >
                See All Miracles
            </a>
          </motion.div>
        </div>
      </div>
    </section>

  );
};

export default CardCarouselSection;
