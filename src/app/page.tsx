"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock, User, Plus } from "lucide-react";

/**
 * Himala Everyday Landing Page
 * Designed to be premium, minimalist, and emotionally resonant.
 * Uses a warm cream and dark brown palette with gold accents.
 */


const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 bg-brand-brown">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 border border-brand-gold/30 rounded-full px-4 py-1 mb-12">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1">
            <span className="text-xs">✧</span> Daily Miracles • Free Forever
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-8">
          A small <i className="font-serif italic text-brand-gold">miracle</i>,<br />
          delivered every morning.
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
          Life is heavy sometimes. The overthinking, the pressure, the &quot;what now?&quot; — we get it. Himala Everyday is a short, free daily message that somehow makes the day feel lighter.
        </p>
      </motion.div>
      
      {/* Background texture/noise could be added here */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
    </section>
  );
};

const StatsRibbon = () => {
  const stats = [
    { label: "Countries", value: "160+" },
    { label: "Languages", value: "25+" },
    { label: "Daily Read", value: "3 min" },
    { label: "Forever Free", value: "₱0" },
  ];

  return (
    <div className="bg-brand-dark-brown py-8 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-around gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="text-3xl font-serif text-brand-gold mb-1">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const marqueeText = [
  "No spam, ever", 
  "Read in 160+ countries", 
  "Available in 25+ languages", 
  "3-minute daily reads", 
  "100% free, no strings attached", 
  "Written by real people, not AI"
];

const Marquee = () => {
  return (
    <div className="bg-[#EFDDD0] py-4 overflow-hidden border-b border-brand-brown/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            {marqueeText.map((text, j) => (
              <div key={j} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-brown/70">{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const DailyMiracleInfo = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="bg-brand-gold/10 absolute -inset-10 rounded-3xl -rotate-2 scale-95"></div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-brand-brown/5">
          <div className="bg-brand-gold h-20 px-8 flex items-end pb-3">
             <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">Today&apos;s Miracle</span>
          </div>
          <div className="p-10">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-brown/40 mb-6">March 25, 2026 • 3 Min Read</div>
            <p className="text-2xl font-serif text-brand-brown leading-relaxed italic mb-8">
              &quot;You are not behind. You are not lost. You are exactly where your next chapter begins.&quot;
            </p>
            <div className="w-12 h-[1px] bg-brand-gold mb-8"></div>
            <p className="text-brand-brown/70 leading-relaxed mb-10">
              Even when everything feels scarce — money, energy, direction — there&apos;s something bigger than the lack. Something that whispers, &quot;I&apos;ve got you. You won&apos;t run out.&quot; That voice? It shows up every morning in your inbox.
            </p>
            <div className="flex items-center gap-4 border-t border-brand-brown/5 pt-8">
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">YC</div>
              <div>
                <div className="text-sm font-bold text-brand-brown">Yen Cabag</div>
                <div className="text-[10px] text-brand-brown/50 uppercase tracking-widest font-bold">Daily Writer</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-[1px] bg-brand-gold"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">What is this?</span>
        </div>
        <h2 className="text-5xl font-serif text-brand-brown leading-tight mb-8">
          Think of it as a daily <i className="italic">miracle</i> in your inbox.
        </h2>
        <p className="text-brand-brown/60 text-lg mb-12 leading-relaxed">
          Himala Everyday is a free daily message — part reflection, part wisdom, part pep talk — that arrives in your inbox every morning. Think of it as that friend who always knows what to say.
        </p>
        
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Clock className="text-brand-gold" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">3 minutes. That&apos;s it.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">Shorter than your morning scroll. Deeper than any motivational quote on IG.</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#405D40]/10 flex items-center justify-center shrink-0">
              <User className="text-[#405D40]" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">Written by humans who&apos;ve been there.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">Not AI. Not generic. Real people who&apos;ve walked through the same mess — and found something worth sharing.</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Check className="text-brand-gold" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-brown mb-1">Free. No catch. No upsell.</h4>
              <p className="text-sm text-brand-brown/50 leading-relaxed">No premium tier. No &quot;unlock more.&quot; Just daily miracles, completely free, forever.</p>
            </div>
          </div>
        </div>
        
        <button className="mt-12 bg-brand-gold text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-2 group">
          Get Your Daily Miracle <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

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
    <section className="py-32 bg-background-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
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
      </div>
      
      {/* Embla Viewport */}
      <div className="overflow-hidden px-6 pb-12" ref={emblaRef}>
        <div className="flex gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-[0_0_400px] h-[500px] bg-card-red rounded-[40px] p-12 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl"
          >
            <div className="absolute top-12 left-12 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full">Mar 23</div>
            <h3 className="text-3xl font-serif mb-6 leading-tight italic">Bakit Nga Ba Kailangan ang Cross?</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">What if the ultimate symbol of pain was actually the ultimate proof that you matter?</p>
            <a href="#" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read this miracle <ArrowRight size={14} /></a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-[0_0_400px] h-[500px] bg-card-green rounded-[40px] p-12 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl"
          >
            <div className="absolute top-12 left-12 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full">Mar 22</div>
            <h3 className="text-3xl font-serif mb-6 leading-tight italic">Can You Embrace Your Differences?</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">What if the thing that makes you &quot;weird&quot; is actually your superpower?</p>
            <a href="#" className="flex items-center gap-2 text-brand-gold font-bold text-sm">Read this miracle <ArrowRight size={14} /></a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-[0_0_400px] h-[500px] bg-card-gold rounded-[40px] p-12 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl"
          >
            <div className="absolute top-12 left-12 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full">Mar 21</div>
            <h3 className="text-3xl font-serif mb-6 leading-tight italic">Love Can Reveal Their Beauty</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">Sometimes the hardest people to love teach us the most about ourselves.</p>
            <a href="#" className="flex items-center gap-2 text-white font-bold text-sm">Read this miracle <ArrowRight size={14} /></a>
          </motion.div>

          {/* Additional cards could be added here to demonstrate the slider */}
          <div className="flex-[0_0_400px] h-[500px] bg-brand-brown rounded-[40px] p-12 shrink-0 relative overflow-hidden flex flex-col justify-end text-white shadow-xl opacity-20">
             <span className="text-center w-full">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>
  );
};


const Testimonials = () => {
    const reviews = [
        {
            tag: "WAS BURNED OUT",
            text: "Parang may kumakausap sa&apos;kin tuwing umaga bago ako lunurin ng anxiety. Ang simple lang — pero it changed how I start my day. Hindi ko inexpect yun.",
            author: "Maria, Cebu",
            tagColor: "text-red-500 bg-red-50"
        },
        {
            tag: "WAS HOLDING GRUDGES",
            text: "I found the strength to forgive people I thought I&apos;d hate forever. I turned the page — literally and figuratively. I can do things I never thought I could.",
            author: "James, Manila",
            tagColor: "text-green-600 bg-green-50"
        },
        {
            tag: "WAS STARTING OVER",
            text: "Reading Himala Everyday is like water in the desert. My life changed in ways I didn&apos;t expect. Parang gumaan ang lahat. I wish I found this sooner.",
            author: "Paolo, Baguio",
            tagColor: "text-purple-600 bg-purple-50"
        }
    ];

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Real Talk</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-16">
                    Real people. Real moments.<br />Real changes.
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-background-cream p-12 rounded-[32px] text-left flex flex-col justify-between border border-brand-brown/5 shadow-sm">
                            <div>
                                <span className={`text-[10px] font-bold tracking-widest border border-brand-brown/5 px-4 py-1.5 rounded-full inline-block mb-10 ${review.tagColor}`}>{review.tag}</span>
                                <p className="text-brand-brown font-serif italic text-lg leading-relaxed mb-12">
                                    &quot;{review.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-[1px] bg-brand-gold"></div>
                                <span className="text-sm font-bold text-brand-brown/60">— {review.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SampleMiracles = () => {
    return (
        <section className="py-32 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Read one now</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-4">
                    Try it before you subscribe.<br />No signup needed.
                </h2>
                <p className="text-brand-brown/50 mb-16">Not sure yet? Good. Just read one. See if something clicks.</p>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-brand-brown/5 group cursor-pointer hover:shadow-xl transition-all">
                        <div className="h-48 bg-card-red relative p-8">
                            <div className="bg-white/90 text-brand-brown text-[10px] font-bold px-3 py-1 rounded-full w-fit">MAR 23</div>
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors italic leading-relaxed">Bakit Nga Ba Kailangan ang Cross?</h3>
                            <p className="text-sm text-brand-brown/50 leading-relaxed mb-6 italic">What if the ultimate symbol of pain was actually the ultimate proof that you matter?</p>
                            <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
                                Read this miracle <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-brand-brown/5 group cursor-pointer hover:shadow-xl transition-all">
                        <div className="h-48 bg-card-green relative p-8">
                            <div className="bg-white/90 text-brand-brown text-[10px] font-bold px-3 py-1 rounded-full w-fit">MAR 22</div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors italic leading-relaxed">Can You Embrace Your Differences?</h3>
                            <p className="text-sm text-brand-brown/50 leading-relaxed mb-6 italic">What if the thing that makes you &quot;weird&quot; is actually your superpower?</p>
                            <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
                                Read this miracle <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-brand-brown/5 group cursor-pointer hover:shadow-xl transition-all">
                        <div className="h-48 bg-card-gold relative p-8">
                            <div className="bg-white/90 text-brand-brown text-[10px] font-bold px-3 py-1 rounded-full w-fit">MAR 21</div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-serif text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors italic leading-relaxed">Love Can Reveal Their Beauty</h3>
                            <p className="text-sm text-brand-brown/50 leading-relaxed mb-6 italic">Sometimes the hardest people to love teach us the most about ourselves.</p>
                            <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
                                Read this miracle <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="bg-brand-dark-brown text-white px-10 py-4 rounded-full font-bold hover:bg-brand-brown transition-all flex items-center gap-4 group">
                        Browse All Miracles <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

const HowItWorks = () => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">How it works</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-4">
                    Three steps. One minute. Zero cost.
                </h2>
                <p className="text-brand-brown/50 mb-20">No app required. No long forms. No credit card.</p>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-brand-brown/5 hidden md:block z-0"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-card-gold text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">1</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Drop Your Email</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Just your email address. Choose Tagalog, Taglish, or English. That&apos;s literally it.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-card-green text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">2</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Wake Up to a Miracle</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Every morning, a new miracle lands in your inbox. Short, meaningful, and surprisingly relevant.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-card-red text-white font-serif text-2xl flex items-center justify-center mb-10 shadow-lg border-8 border-white">3</div>
                        <h4 className="font-bold text-xl text-brand-brown mb-4">Feel the Shift</h4>
                        <p className="text-brand-brown/50 text-sm leading-relaxed max-w-[240px]">
                            Not overnight. But slowly, something changes. The day feels lighter. People notice. You notice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HumansBehind = () => {
    return (
        <section className="py-32 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">The humans behind it</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-brand-brown leading-tight mb-4">
                    Not gurus. Not influencers.<br />Just real people.
                </h2>
                <p className="text-brand-brown/50 mb-16 max-w-xl leading-relaxed">
                    They&apos;ve known burnout, heartbreak, and doubt. That&apos;s exactly why their words hit different.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[32px] p-10 flex flex-col md:flex-row gap-8 shadow-sm border border-brand-brown/5">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-card-gold to-card-red flex items-center justify-center text-white font-serif text-2xl shrink-0">Y</div>
                        <div>
                            <div className="flex flex-col mb-4">
                                <span className="text-xl font-bold text-brand-brown">Yen Cabag</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Daily Writer</span>
                            </div>
                            <p className="text-brand-brown/60 text-sm leading-relaxed">
                                Homeschooling mom, writer, entrepreneur. Lives a quiet life in the mountains surrounded by books, her crochet, and her family. Believes the simplest life is already a miracle.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-10 flex flex-col md:flex-row gap-8 shadow-sm border border-brand-brown/5">
                        <div className="w-20 h-20 rounded-full bg-card-green flex items-center justify-center text-white font-serif text-2xl shrink-0">M</div>
                        <div>
                            <div className="flex flex-col mb-4">
                                <span className="text-xl font-bold text-brand-brown">Mark Cabag</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Daily Writer</span>
                            </div>
                            <p className="text-brand-brown/60 text-sm leading-relaxed">
                                Drummer, trail runner, adoptive father of two. Dreams of a Philippines where every kid has a family. Writes because he believes listening is where every miracle starts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TheApp = () => {
    return (
        <section className="bg-card-green relative overflow-hidden py-32">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-brand-gold"></div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">The app</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                            Take your daily miracle everywhere.
                        </h2>
                        <p className="text-white/60 text-lg mb-12 leading-relaxed max-w-md">
                            No email? No problem. Download the app and get your miracle on your phone instead. Free on both platforms.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm group">
                                <span className="text-xs">Download on the</span>
                                <span className="font-bold">App Store</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-3 backdrop-blur-sm group">
                                <span className="text-xs">Get it on</span>
                                <span className="font-bold">Google Play</span>
                            </button>
                        </div>
                    </div>


                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-64 h-[500px] bg-white rounded-[40px] shadow-2xl border-[8px] border-white/10 overflow-hidden md:translate-y-20">
                            <div className="absolute inset-0 bg-background-cream p-8 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-card-gold to-card-red flex items-center justify-center mb-6 shadow-lg">
                                    <Plus className="text-white transform rotate-45" size={32} />
                                </div>
                                <h4 className="font-serif text-xl font-bold text-brand-brown mb-2">Himala Everyday</h4>
                                <p className="text-xs text-brand-brown/50 leading-relaxed">Your daily miracle — right in your hand, every single morning.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const FinalCTA = () => {
    return (
        <section className="py-32 bg-background-cream relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-8 h-[1px] bg-brand-gold"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold">Your first miracle</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-brand-brown leading-tight mb-12">
                    Tomorrow morning,<br />a <span className="italic text-brand-gold">miracle</span> is waiting in your inbox.
                </h2>
                <p className="text-brand-brown/60 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
                    One email. That&apos;s the only thing between you and a daily reminder that life can be lighter. It&apos;s free. It&apos;s short. And somehow, it works.
                </p>

                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8">
                    <input 
                        type="email" 
                        placeholder="Your email address..." 
                        className="flex-1 bg-white border border-brand-brown/5 rounded-full px-8 py-4 focus:outline-none focus:border-brand-gold shadow-sm"
                    />
                    <button className="bg-brand-dark-brown text-white px-10 rounded-full font-bold hover:bg-brand-brown transition-all py-4 md:py-0 whitespace-nowrap">
                        Get My Miracle
                    </button>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/30">
                    Free forever. Unsubscribe anytime. We don&apos;t do spam — only miracles.
                </p>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-card-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-card-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </section>
    );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background-cream">
      <Hero />
      <StatsRibbon />
      <Marquee />
      <DailyMiracleInfo />
      <HowItWorks />
      <HumansBehind />
      <CardCarouselSection />
      <Testimonials />
      <TheApp />
      <SampleMiracles />
      <FinalCTA />
    </main>
  );
}

