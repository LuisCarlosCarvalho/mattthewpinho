"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { NewsItem } from "@/src/lib/news";
import { useLanguage } from "@/src/context/LanguageContext";

interface NewsHeroProps {
  highlights: NewsItem[];
}

export function NewsHero({ highlights }: NewsHeroProps) {
  const { t } = useLanguage();
  
  if (highlights.length === 0) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
      {/* Primary Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-8 group relative aspect-video md:aspect-[21/9] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5"
      >
        <Image
          src={highlights[0].imageUrl}
          alt={highlights[0].title}
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#FF8C00] text-black text-xs font-black uppercase tracking-[0.2em] rounded-full">
            {t.blog.categories[highlights[0].category]}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {highlights[0].title}
          </h2>
          <p className="text-white/60 text-lg line-clamp-2 max-w-2xl font-light">
            {highlights[0].contentSnippet}
          </p>
          <a
            href={highlights[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-[#FF8C00] transition-colors mt-4"
          >
            {t.blog.readMore}
            <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>

      {/* Secondary Highlights */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {highlights.slice(1, 3).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
            className="flex-1 group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 min-h-[250px]"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full space-y-2">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">
                 {t.blog.categories[item.category]}
              </span>
              <h3 className="text-xl font-bold text-white line-clamp-2 leading-snug group-hover:text-[#FF8C00] transition-colors">
                {item.title}
              </h3>
            </div>
            
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-20"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
