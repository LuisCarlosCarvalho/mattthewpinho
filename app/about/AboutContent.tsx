"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const badges = t.about.badges;

  return (
    <main className="flex-1 flex items-center justify-center bg-transparent pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Lado Esquerdo (Visual) */}
          <motion.div variants={slideLeftVariants} className="relative group mx-auto lg:mx-0 w-full max-w-md">
            {/* Efeito de moldura vazada (Offset rectangle) */}
            <div className="absolute top-6 -left-6 w-full h-full border-2 border-[#FF8C00] rounded-xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 opacity-80" />
            
            <div className="relative z-10 w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-2xl">
              <Image
                src="https://i.imgur.com/X8klnDc.jpeg"
                alt="Matthew Pinho Profile"
                fill
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Lado Direito (Texto) */}
          <motion.div variants={slideRightVariants} className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-2 leading-tight">
                {t.about.title}
              </h1>
              
              <div className="flex items-center gap-3">
                <span className="w-12 h-1 bg-[#FF8C00] block" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">{t.about.badge}</h3>
              </div>
            </div>

            <div className="space-y-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              <p>
                {t.about.bio1} <span className="text-zinc-900 dark:text-white font-medium">{t.about.bio1Bold}</span>{t.about.bio1End}
              </p>
              <p>
                {t.about.bio2Part1} <span className="text-[#FF8C00] font-medium">{t.about.bio2Bold}</span> {t.about.bio2Part2}
              </p>
              <p className="bg-zinc-100 dark:bg-white/5 p-4 rounded-lg border border-zinc-200 dark:border-white/5 italic">
                "{t.about.quote} <span className="text-[#FF8C00]">{t.about.quoteEnd}</span>"
              </p>
            </div>

            {/* Badges / Skills */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">{t.about.specialization}</h4>
              <div className="flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <span 
                    key={badge} 
                    className="px-4 py-2 bg-white dark:bg-black border border-zinc-200 dark:border-[#FF8C00]/30 text-zinc-900 dark:text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-sm dark:shadow-[0_0_15px_rgba(255,140,0,0.05)] hover:border-[#FF8C00] transition-colors cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-zinc-200 dark:border-white/10 mt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center group"
              >
                <div className="bg-[#FF8C00] text-black font-bold px-6 py-4 rounded-full flex items-center gap-3 transition-transform duration-300 hover:scale-105 hover:bg-[#e67e00]">
                  <span className="uppercase tracking-wider text-sm">{t.about.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
