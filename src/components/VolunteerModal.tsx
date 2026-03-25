"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, HeartHandshake, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitVolunteerForm } from "@/app/actions/volunteer";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityTitle?: string;
}

/**
 * Main Modal Component
 * Handles the overlay and animation logic.
 * The internal form state is isolated in VolunteerFormContent to avoid the 
 * "cascading render" lint error and ensure resets on every open.
 */
export default function VolunteerModal({ isOpen, onClose, opportunityTitle }: VolunteerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-dark border border-white/10 rounded-[3rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white backdrop-blur-md border border-white/10"
            >
              <X size={24} />
            </button>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar scroll-smooth">
               <VolunteerFormContent 
                 onClose={onClose} 
                 opportunityTitle={opportunityTitle || "General Volunteer"} 
               />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Isolated Form Content
 * This component resets its own state automatically when mounted.
 */
function VolunteerFormContent({ onClose, opportunityTitle }: { onClose: () => void; opportunityTitle: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    churchOrg: "",
    work: "",
    email: "",
    contactNumber: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const result = await submitVolunteerForm({
        ...formData,
        opportunity: opportunityTitle
      });
      
      if (result.success) {
        setStatus("success");
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

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-brand-yellow" />
        </div>
        <h4 className="text-3xl font-bold text-white mb-2">Application Received!</h4>
        <p className="text-gray-400 text-lg">Thank you for your heart to serve. We&apos;ll review your application and get back to you soon.</p>
        <button 
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-brand-yellow text-brand-black font-extrabold rounded-xl hover:bg-white transition-all transform hover:scale-105"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HeartHandshake className="text-brand-yellow" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
           Apply to be a <span className="text-brand-yellow">Volunteer</span>
        </h2>
        <p className="text-brand-yellow/60 font-medium uppercase tracking-widest text-sm">
          As: {opportunityTitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            <span>Failed to submit. Please check your connection and try again.</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700"
              placeholder="Your Name"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Church/Organization</label>
            <input
              type="text"
              name="churchOrg"
              required
              value={formData.churchOrg}
              onChange={handleChange}
              className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700"
              placeholder="Where do you belong?"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Work/Profession</label>
            <input
              type="text"
              name="work"
              required
              value={formData.work}
              onChange={handleChange}
              className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700"
              placeholder="Your Occupation"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700"
              placeholder="09xx xxx xxxx"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Message (Optional)</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-brand-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all placeholder:text-gray-700 resize-none"
            placeholder="Any additional info or questions?"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="mt-4 w-full flex items-center justify-center gap-3 px-8 py-5 bg-brand-yellow text-brand-black font-extrabold rounded-2xl hover:bg-white active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none shadow-xl shadow-brand-yellow/10"
        >
          {status === "submitting" ? (
            <>
              Submitting Application... <Loader2 size={20} className="animate-spin" />
            </>
          ) : (
            <>
              Submit Application <Send size={20} />
            </>
          )}
        </button>
      </form>
    </>
  );
}
