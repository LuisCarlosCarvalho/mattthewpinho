"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { NewsItem } from "@/src/lib/news";
import { useLanguage } from "@/src/context/LanguageContext";

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export function NewsCard({ item, index }: NewsCardProps) {
  const { t } = useLanguage();

  const formatTimeAgo = (dateString: string) => {
    try {
      const now = new Date();
      const past = new Date(dateString);
      const diffInMs = now.getTime() - past.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      
      if (diffInHours < 1) return `1h ${t.blog.ago}`;
      if (diffInHours < 24) return `${diffInHours}h ${t.blog.ago}`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ${t.blog.ago}`;
    } catch (e) {
      return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FF8C00]/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#FF8C00] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {t.blog.categories[item.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-white/40 text-xs font-medium">
          <span className="text-[#FF8C00]/80">{item.source}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {formatTimeAgo(item.pubDate)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-[#FF8C00] transition-colors line-clamp-2 leading-tight">
          {item.title}
        </h3>

        <p className="text-white/50 text-sm line-clamp-2 leading-relaxed font-light">
          {item.contentSnippet}
        </p>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#FF8C00] text-sm font-bold uppercase tracking-widest group/btn border-b border-transparent hover:border-[#FF8C00] transition-all pt-2"
        >
          {t.blog.readMore}
          <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </a>
      </div>
    </motion.div>
  );
}
