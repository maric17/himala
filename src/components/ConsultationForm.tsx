"use client";

import React, { useState } from "react";
import { Briefcase, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitConsultationForm } from "@/app/actions/consultation";

interface ConsultationFormProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  icon?: React.ElementType;
  messagePlaceholder?: string;
}

export default function ConsultationForm({
  title = <>Ready to Bring Jesus to <br />Your <span className="text-brand-yellow">Workplace?</span></>,
  subtitle = "Schedule a complimentary workplace implementation consultation to discuss how these tools can fit your unique business culture.",
  badge = "Get in Touch",
  icon: Icon = Briefcase,
  messagePlaceholder = "How can we help transform your workspace?"
}: ConsultationFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const result = await submitConsultationForm(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", contactNumber: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-brand-black rounded-[3rem] p-8 md:p-16 relative overflow-hidden group shadow-2xl flex flex-col md:flex-row gap-12 items-center text-left max-w-6xl mx-auto">
      <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
        <Icon size={300} className="text-white" />
      </div>
      
      <div className="w-full md:w-1/2 relative z-10">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-brand-yellow/10 text-brand-yellow rounded-full border border-brand-yellow/20">
          {badge}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-gray-400 mb-8 max-w-md">
          {subtitle}
        </p>
      </div>

      <div className="w-full md:w-1/2 relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-brand-yellow" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
            <p className="text-gray-400">We&apos;ll be in touch with you shortly to schedule your consultation.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-8 px-6 py-2 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} />
                <span>Failed to send message. Make sure the Google Script URL is configured.</span>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-600"
                placeholder="Juan Dela Cruz"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-600"
                placeholder="juan@company.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="contactNumber" className="text-sm font-medium text-gray-300">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-600"
                placeholder="0917 123 4567"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-600 resize-none"
                placeholder={messagePlaceholder}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="mt-2 w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-yellow text-brand-black font-extrabold rounded-xl hover:bg-white active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none"
            >
              {status === "submitting" ? (
                <>
                  Sending... <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Submit Request <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
