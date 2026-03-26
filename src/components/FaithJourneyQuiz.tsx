"use client";

import React, { useState } from "react";
import { FadeIn } from "./FadeIn";
import { 
  Check, 
  ChevronRight, 
  RotateCcw, 
  BookHeart, 
  Film, 
  PlayCircle, 
  Users, 
  ExternalLink,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    id: 1,
    question: "What best describes your current faith journey?",
    options: [
      { id: "curious", text: "Just curious / Seeking", icon: Sparkles },
      { id: "rediscovering", text: "Rediscovering my faith", icon: RotateCcw },
      { id: "deeper", text: "Wanting to grow deeper", icon: ChevronRight },
    ],
  },
  {
    id: 2,
    question: "How much time can you commit each day?",
    options: [
      { id: "quick", text: "5-10 minutes (Quick but meaningful)", icon: PlayCircle },
      { id: "medium", text: "20-30 minutes (Deeper study)", icon: BookHeart },
      { id: "community", text: "I prefer community interactions", icon: Users },
    ],
  },
  {
    id: 3,
    question: "What format do you prefer?",
    options: [
      { id: "reading", text: "Reading (Devotionals)", icon: BookHeart },
      { id: "watching", text: "Watching (Video series)", icon: Film },
      { id: "engaging", text: "Engaging with others (Community)", icon: Users },
    ],
  },
];

const RESULTS = {
  himala: {
    title: "Himala Every day",
    description: "Start each day with God. Our Filipino devotionals make Scripture practical and personal—perfect for busy lives.",
    link: "https://himala.everyday.ph.jesus.net",
    displayLink: "himala.everyday.ph.jesus.net",
    icon: BookHeart,
  },
  myjourney: {
    title: "MyJourney with The Chosen",
    description: "Go deeper into the stories of Jesus through interactive Bible studies paired with The Chosen series.",
    link: "https://myjourney.ph.jesus.net",
    displayLink: "myjourney.ph.jesus.net",
    icon: Film,
  },
  chosen: {
    title: "Watch The Chosen (Free)",
    description: "Experience the life of Jesus like never before. Stream all seasons free and see the Gospel come alive.",
    link: "https://thechosen.ph.jesus.net",
    displayLink: "thechosen.ph.jesus.net",
    icon: PlayCircle,
  },
  community: {
    title: "Join Our Community",
    description: "Connect with other believers on the same journey. Find encouragement, accountability, and friendship.",
    link: "https://ph.jesus.net/community",
    displayLink: "ph.jesus.net/community",
    icon: Users,
  },
};

export default function FaithJourneyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const getRecommendation = () => {
    const q1 = answers[0];
    const q3 = answers[2];

    if (q3 === "engaging") return RESULTS.community;
    if (q3 === "watching" && q1 === "curious") return RESULTS.chosen;
    if (q3 === "reading") return RESULTS.himala;
    return RESULTS.myjourney;
  };

  if (isFinished) {
    const recommendation = getRecommendation();
    const Icon = recommendation.icon;

    return (
      <div className="max-w-2xl mx-auto">
        <FadeIn direction="up">
          <div className="bg-brand-light rounded-[3rem] p-12 text-brand-black shadow-2xl border border-brand-yellow/20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">Recommended for You</span>
            <div className="w-20 h-20 bg-brand-yellow rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-brand-yellow/20">
              <Icon className="text-brand-black" size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-6">{recommendation.title}</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              {recommendation.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={recommendation.link}
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 py-5 bg-brand-black text-white font-bold rounded-2xl hover:bg-brand-dark transition-all"
              >
                Go to Tool <ExternalLink size={20} />
              </Link>
              <button 
                onClick={resetQuiz}
                className="inline-flex items-center justify-center gap-2 py-5 px-8 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all underline decoration-brand-yellow decoration-2 underline-offset-4"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Step {step + 1} of {QUESTIONS.length}</span>
          <div className="flex gap-2">
            {QUESTIONS.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step ? "w-8 bg-brand-yellow" : i < step ? "w-4 bg-brand-yellow/40" : "w-4 bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          {currentQuestion.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option) => {
          const OptionIcon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="group relative flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 text-left hover:border-brand-yellow/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                <OptionIcon size={24} />
              </div>
              <span className="text-xl font-medium flex-grow">{option.text}</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                <Check size={16} className="opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
