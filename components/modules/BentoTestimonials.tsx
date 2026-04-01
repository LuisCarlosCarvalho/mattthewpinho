"use client";

import { motion, Variants } from "framer-motion";
import { Quote, Trophy, Users } from "lucide-react";

export function BentoTestimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const clients = ["Liga BPI", "SCBraga", "Federação Portuguesa", "Red Bull", "Assoc. Futebol", "Sanjoanense"];

  return (
    <section className="py-24 px-6 bg-transparent relative z-10 border-b border-zinc-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-[minmax(250px,_auto)]"
        >
          {/* Main Testimonial (Large Block) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 p-8 md:p-12 overflow-hidden group hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Quote size={120} className="text-zinc-900 dark:text-white" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
              <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-zinc-800 dark:text-white/90 text-pretty">
                "Working with Matthew changes the perspective. He doesn't just shoot photography, he distils the absolute peak tension and translates it into pure adrenaline on screen."
              </p>
              <div>
                <p className="text-xl font-bold text-zinc-900 dark:text-white">Director of Marketing</p>
                <p className="text-[#FF8C00] font-medium tracking-wide uppercase text-sm mt-1">National Athletic Org.</p>
              </div>
            </div>
          </motion.div>

          {/* Clients Block */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 p-8 flex flex-col hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">Trusted By</h3>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {clients.map((client) => (
                <span 
                  key={client}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white/70 text-xs md:text-sm rounded-full border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none"
                >
                  {client}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats / Metric Block */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl bg-gradient-to-br from-[#FF8C00]/10 to-white dark:from-[#FF8C00]/20 dark:to-black/80 border border-zinc-200 dark:border-[#FF8C00]/20 p-8 flex flex-col justify-center relative overflow-hidden group shadow-sm dark:shadow-none"
          >
            <div className="absolute inset-0 bg-[#FF8C00]/5 blur-3xl rounded-full scale-150 group-hover:bg-[#FF8C00]/10 transition-colors duration-700" />
            <div className="relative z-10">
              <Trophy className="w-8 h-8 text-[#FF8C00] mb-4" />
              <div className="space-y-1">
                <h4 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white">50M+</h4>
                <p className="text-[#e67e00] dark:text-[#FF8C00]/80 font-medium tracking-wide">Digital Views & Impressions</p>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4 leading-relaxed text-pretty">
                Consistent impact delivering global commercial visuals since 2016.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
