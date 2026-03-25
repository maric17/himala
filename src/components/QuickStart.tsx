"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Church, BookOpen, Briefcase, Handshake, Users, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const START_CARDS = [
  {
    title: "I Want to Grow in Faith",
    description: "Personal devotions, Bible study tools, and faith resources",
    linkText: "For Individuals",
    href: "/individuals",
    icon: User,
  },
  {
    title: "I'm a Church Leader",
    description: "Resources to equip your congregation and raise digital missionaries",
    linkText: "For Churches",
    href: "/churches",
    icon: Church,
  },
  {
    title: "I Lead a Bible Study Group",
    description: "Free materials and activities for discipleship groups",
    linkText: "For Bible Study Leaders",
    href: "/individuals#bible-study",
    icon: BookOpen,
  },
  {
    title: "I'm a Business Leader",
    description: "Transform your workplace culture through faith-based content",
    linkText: "For Business Leaders",
    href: "/individuals#business",
    icon: Briefcase,
  },
  {
    title: "I Want to Serve",
    description: "Use your skills to reach more people for Jesus",
    linkText: "Volunteer Application",
    href: "#volunteer",
    icon: Handshake,
  },
  {
    title: "I'm Looking for Community",
    description: "Join a community of digital missionaries across the Philippines",
    linkText: "Join Community",
    href: "#community",
    icon: Users,
  },
];

export default function QuickStart() {
  return (
    <section className="py-24 bg-brand-light w-full text-brand-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <FadeIn direction="up" className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-brand-black mb-6">
              Quick Start: <br/>
              <span className="font-bold">Who Are You?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-light pr-4">
              Choose the path that best describes you to find the resources you need.
            </p>
          </FadeIn>
        </div>

        {/* Minimalist Futuristic Light Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {START_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn 
                key={card.title}
                direction="up" 
                delay={0.1 * index}
                duration={0.6}
              >
                <Link href={card.href} className="flex flex-col h-full group">
                  {/* Top animated line - black for light theme */}
                  <div className="w-full h-[1px] bg-black/10 mb-6 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 w-full bg-brand-yellow -translate-x-full group-hover:translate-x-0"
                      transition={{ duration: 0.5, ease: "circOut" }}
                    />
                  </div>

                  <div className="flex flex-col h-full pl-2">
                    <div className="mb-8">
                      <Icon strokeWidth={1.5} className="w-10 h-10 text-brand-black group-hover:text-brand-yellow transition-colors duration-500" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4 text-brand-black group-hover:text-brand-yellow transition-colors duration-300">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-500 mb-10 text-[16px] font-light leading-relaxed flex-grow">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center text-gray-400 group-hover:text-brand-black transition-colors duration-300 text-sm font-semibold tracking-wider uppercase mt-auto">
                      <span className="mr-3">{card.linkText}</span>
                      <motion.div
                         className="p-2 rounded-full border border-black/10 group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black transition-all duration-300"
                      >
                         <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
