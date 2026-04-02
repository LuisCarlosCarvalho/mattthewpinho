"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/src/context/LanguageContext";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: {
    title: string;
    link: string;
    pubDate: string;
    source: string;
    image: string;
    description?: string;
  };
  index: number;
}

export function NewsCard({ news, index }: NewsCardProps) {
  const { t } = useLanguage();
  
  // Format date
  const date = new Date(news.pubDate);
  const formattedDate = date.toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-[#FF8C00]/50 transition-all duration-500 shadow-xl"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Source Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#FF8C00]">
            {news.source}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
          <Calendar size={12} className="text-[#FF8C00]" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-xl font-bold text-white line-clamp-2 md:group-hover:text-[#FF8C00] transition-colors leading-snug">
          {news.title}
        </h3>

        <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed flex-1">
          {news.description}
        </p>

        {/* Action */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#FF8C00] font-bold text-sm tracking-wide group/link"
          >
            {t.blog.readMore}
            <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </a>
          
          <div className="h-6 w-px bg-white/5" />
          
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
            <span>LIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NewsSkeleton() {
  return (
    <div className="flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden animate-pulse">
      <div className="h-64 bg-zinc-800" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-32 bg-zinc-800 rounded-full" />
        <div className="h-6 w-full bg-zinc-800 rounded-lg" />
        <div className="h-6 w-4/5 bg-zinc-800 rounded-lg" />
        <div className="pt-4 mt-auto border-t border-white/5">
          <div className="h-4 w-28 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
