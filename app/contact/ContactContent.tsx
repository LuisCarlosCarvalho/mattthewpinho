"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Camera, User, Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactFormData = {
  name: string;
  email: string;
  eventDate: string;
  message: string;
};

const services = [
  {
    icon: <Camera className="w-8 h-8 md:w-12 md:h-12 text-[#FF8C00] mb-6" />,
    title: "Event Coverage",
    description: "Capturing the heat, the raw emotion, and every unrepeatable moment of your live events with striking cinematic angles."
  },
  {
    icon: <User className="w-8 h-8 md:w-12 md:h-12 text-[#FF8C00] mb-6" />,
    title: "Athlete Portraits",
    description: "Intimate and powerful studio or on-location portraits that highlight the resilience, dedication, and personality of the athlete."
  },
  {
    icon: <Briefcase className="w-8 h-8 md:w-12 md:h-12 text-[#FF8C00] mb-6" />,
    title: "Commercial & Brand",
    description: "High-end institutional and advertising photography tailored to elevate your brand's narrative and market presence."
  }
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    console.log("Mock Payload:", data);
  };

  return (
    <main className="flex-1 flex flex-col pt-24 bg-transparent text-zinc-900 dark:text-white min-h-screen">
      
      {/* 1. Header Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-white">Let's Create Together</h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Whether you need explosive event coverage or meticulous portraiture, my lens is ready to capture your story.
        </p>
      </section>

      {/* 2. Services Section */}
      <section className="px-6 py-12 bg-white dark:bg-white/[0.02] border-y border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            {services.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                {service.icon}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Contact Form Section */}
      <section className="px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inquire</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Fill out the details below and I'll get back to you within 48 hours.</p>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-10"
              >
                {/* Minimalist Grid Layout for Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Name field */}
                  <div className="flex flex-col relative">
                    <input 
                      {...register("name", { required: "Name is required" })}
                      type="text" 
                      placeholder="Your Name *"
                      className={`peer w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50'} py-3 text-zinc-900 dark:text-white placeholder-transparent focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors`}
                    />
                    <label className={`absolute left-0 -top-4 text-xs font-medium tracking-wider uppercase transition-all
                      peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-white/40 peer-placeholder-shown:normal-case
                      peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-700 dark:peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-wider
                    `}>Your Name *</label>
                    {errors.name && <span className="text-red-500 dark:text-red-400 text-xs mt-2">{errors.name.message}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col relative">
                    <input 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email formatting" }
                      })}
                      type="email" 
                      placeholder="Email Address *"
                      className={`peer w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50'} py-3 text-zinc-900 dark:text-white placeholder-transparent focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors`}
                    />
                    <label className={`absolute left-0 -top-4 text-xs font-medium tracking-wider uppercase transition-all
                      peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-white/40 peer-placeholder-shown:normal-case
                      peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-700 dark:peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-wider
                    `}>Email Address *</label>
                    {errors.email && <span className="text-red-500 dark:text-red-400 text-xs mt-2">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Event Date field */}
                <div className="flex flex-col relative pt-4">
                  <input 
                    {...register("eventDate")}
                    type="text" 
                    placeholder="Event Date or Location"
                    className="peer w-full bg-transparent border-b border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50 py-3 text-zinc-900 dark:text-white placeholder-transparent focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                  />
                  <label className="absolute left-0 0 text-xs font-medium tracking-wider uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-white/40 peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-700 dark:peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-wider">Event Date or Location</label>
                </div>

                {/* Message field */}
                <div className="flex flex-col relative pt-4">
                  <textarea 
                    {...register("message", { required: "Please provide some details about the project" })}
                    placeholder="Tell me about your project *"
                    rows={4}
                    className={`peer w-full bg-transparent border-b ${errors.message ? 'border-red-500/50' : 'border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50'} py-3 text-zinc-900 dark:text-white placeholder-transparent resize-none focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors`}
                  />
                  <label className={`absolute left-0 0 text-xs font-medium tracking-wider uppercase transition-all
                    peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-white/40 peer-placeholder-shown:normal-case
                    peer-focus:top-0 peer-focus:text-xs peer-focus:text-zinc-700 dark:peer-focus:text-white/70 peer-focus:uppercase peer-focus:tracking-wider
                  `}>Tell me about your project *</label>
                  {errors.message && <span className="text-red-500 dark:text-red-400 text-xs mt-2">{errors.message.message}</span>}
                </div>

                <div className="flex justify-end pt-8">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-[#FF8C00] text-black font-bold uppercase tracking-wider rounded-full hover:bg-[#CC7000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className={cn("transition-opacity", isSubmitting ? "opacity-0" : "opacity-100")}>
                      Send Request
                    </span>
                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      </span>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 dark:bg-[#050505] rounded-3xl border border-zinc-200 dark:border-white/5 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-[#FF8C00]" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">Message Sent</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-sm mx-auto">
                    Thank you reaching out. I'll get back to you shortly to discuss your vision.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2 text-sm text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-white/10 hover:border-zinc-500 dark:hover:border-white/30 rounded-full transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
