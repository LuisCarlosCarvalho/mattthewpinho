"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-football.png"
          alt={t.hero.titlePart1 + " " + t.hero.titlePart2 + " " + t.hero.titlePart3}
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-slate-50 dark:from-[#050505]/30 dark:via-[#050505]/50 dark:to-[#050505] backdrop-blur-[2px]" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-20"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6 uppercase leading-[0.9]"
          style={{ fontFamily: "var(--font-sans)" }} // Uses Geist/Inter from the root layout
        >
          {t.hero.titlePart1} <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-white/50">
            {t.hero.titlePart2}
          </span>{" "}
          <br className="md:hidden" />
          {t.hero.titlePart3}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 font-medium"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-[#FF8C00] text-black font-bold rounded-full overflow-hidden transition-all hover:bg-[#CC7000] hover:scale-105 active:scale-95 flex items-center gap-2">
            {t.hero.portfolioBtn}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-[#FF8C00]/50 ring-offset-2 ring-offset-transparent dark:ring-offset-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="px-8 py-4 bg-transparent text-zinc-900 dark:text-white font-semibold rounded-full border border-black/20 dark:border-white/20 hover:border-[#FF8C00] dark:hover:border-[#FF8C00] hover:text-[#FF8C00] dark:hover:text-[#FF8C00] hover:bg-[#FF8C00]/10 transition-colors backdrop-blur-md">
            {t.hero.workBtn}
          </button>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-8 h-12 rounded-full border border-[#FF8C00]/30 flex items-start justify-center p-1.5 backdrop-blur-sm bg-white/5"
        >
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
