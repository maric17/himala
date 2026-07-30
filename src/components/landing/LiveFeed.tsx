"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FeedItem = {
  city: string;
  action: string;
  time: string;
  tone: "gold" | "green" | "brown";
  width: string;
};

const cities = [
  "Quezon City",
  "Cebu City",
  "Davao",
  "Iloilo",
  "Bacolod",
  "Cagayan de Oro",
  "Baguio",
  "General Santos",
  "Makati",
  "Zamboanga",
  "Tagbilaran",
  "Naga",
  "Tacloban",
  "San Fernando",
  "Antipolo",
  "Puerto Princesa",
  "Manila",
  "Pasig",
  "Mandaluyong",
  "Paranaque",
  "Las Pinas",
  "Marikina",
  "Valenzuela",
  "Caloocan",
  "Muntinlupa",
  "Pasay",
  "Taguig",
  "Malolos",
  "Meycauayan",
  "Angeles",
  "Tarlac City",
  "Dagupan",
  "Laoag",
  "Tuguegarao",
  "Batangas City",
  "Lipa",
  "Lucena",
  "Calamba",
  "Santa Rosa",
  "Legazpi",
  "Roxas City",
  "Dumaguete",
  "Mandaue",
  "Lapu-Lapu",
  "Ormoc",
  "Butuan",
  "Surigao City",
  "Dipolog",
  "Koronadal",
  "Kidapawan",
  "Cotabato City",
  "Pagadian",
  "Malaybalay",
  "Digos",
  "Panabo",
];

const actions = [
  "opened today's reflection",
  "started a 3-minute read",
  "shared a miracle with a friend",
  "came back for the morning message",
  "saved a reflection for later",
  "joined the daily email list",
  "finished today's miracle",
  "read in Tagalog",
  "read in English",
  "continued from yesterday's message",
];

const times = [
  "just now",
  "1m ago",
  "3m ago",
  "5m ago",
  "8m ago",
  "12m ago",
  "17m ago",
  "24m ago",
  "31m ago",
  "42m ago",
  "this morning",
  "before breakfast",
];

const tones: FeedItem["tone"][] = ["gold", "green", "brown"];
const widths = ["w-[15rem]", "w-[17rem]", "w-[19rem]", "w-[21rem]"];

const toneClasses: Record<FeedItem["tone"], string> = {
  gold: "bg-brand-gold shadow-[0_0_0_6px_rgba(220,162,81,0.14)]",
  green: "bg-card-green shadow-[0_0_0_6px_rgba(64,93,64,0.12)]",
  brown: "bg-brand-brown shadow-[0_0_0_6px_rgba(42,30,23,0.1)]",
};

const fallbackFeed: FeedItem[] = [
  {
    city: "Quezon City",
    action: "opened today's reflection",
    time: "just now",
    tone: "gold",
    width: "w-[19rem]",
  },
  {
    city: "Cebu City",
    action: "joined the daily email list",
    time: "3m ago",
    tone: "green",
    width: "w-[17rem]",
  },
  {
    city: "Davao",
    action: "shared a miracle with a friend",
    time: "8m ago",
    tone: "brown",
    width: "w-[21rem]",
  },
];

const randomItem = <T,>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];

const randomFeedDuration = () => 58 + Math.floor(Math.random() * 21);

const buildFeedItems = (count = 18): FeedItem[] => {
  const usedCities = new Set<string>();

  return Array.from({ length: count }, () => {
    let city = randomItem(cities);

    if (usedCities.size < cities.length) {
      while (usedCities.has(city)) {
        city = randomItem(cities);
      }
    }

    usedCities.add(city);

    return {
      city,
      action: randomItem(actions),
      time: randomItem(times),
      tone: randomItem(tones),
      width: randomItem(widths),
    };
  });
};

export default function LiveFeed() {
  const [dailyReads, setDailyReads] = useState(12480);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(fallbackFeed);
  const [feedDuration, setFeedDuration] = useState(64);

  useEffect(() => {
    const initialRandomize = window.setTimeout(() => {
      setDailyReads(12480 + Math.floor(Math.random() * 320));
      setFeedItems(buildFeedItems());
      setFeedDuration(randomFeedDuration());
    }, 0);

    const interval = window.setInterval(() => {
      setDailyReads((current) => current + Math.floor(Math.random() * 4 + 1));
    }, 2400 + Math.floor(Math.random() * 1800));

    const feedInterval = window.setInterval(() => {
      setFeedItems(buildFeedItems());
      setFeedDuration(randomFeedDuration());
    }, 28000);

    return () => {
      window.clearTimeout(initialRandomize);
      window.clearInterval(interval);
      window.clearInterval(feedInterval);
    };
  }, []);

  return (
    <section className="relative z-20 -mt-14 px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-brand-brown/8 bg-white/82 shadow-[0_24px_60px_rgba(30,18,14,0.1)] backdrop-blur-xl">
        <div className="grid gap-6 px-5 py-5 md:grid-cols-[0.95fr_1.65fr] md:px-8 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[26px] bg-brand-dark-brown px-5 py-5 text-white"
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold/85">
              Live miracle feed
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-serif text-brand-gold sm:text-5xl">
                {dailyReads.toLocaleString()}
              </span>
              <span className="pb-1 text-xs font-bold uppercase tracking-[0.24em] text-white/48">
                reads today
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">
              Gentle social proof from readers around the Philippines, refreshed
              throughout the day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-[26px] border border-brand-brown/8 bg-[#F6E9DA]"
          >
            <div className="border-b border-brand-brown/8 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-brand-brown/48">
                Activity across the Philippines
              </p>
            </div>

            <div className="overflow-hidden py-5">
              <div
                className="animate-feed flex min-w-max gap-4 px-5"
                style={{ animationDuration: `${feedDuration}s` }}
              >
                {[...feedItems, ...feedItems].map((item, index) => (
                  <div
                    key={`${item.city}-${item.action}-${item.time}-${index}`}
                    className={`flex ${item.width} shrink-0 items-center gap-3 rounded-full border border-brand-brown/8 bg-white px-4 py-3 text-sm text-brand-brown/78 shadow-sm`}
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${toneClasses[item.tone]}`}
                    />
                    <span className="min-w-0">
                      <span className="font-semibold text-brand-brown">
                        {item.city}
                      </span>{" "}
                      {item.action}
                      <span className="ml-2 whitespace-nowrap text-brand-brown/38">
                        {item.time}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
