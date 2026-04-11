"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { NewsItem } from "@/src/lib/news";
import { NewsHero } from "./NewsHero";
import { NewsCard } from "./NewsCard";
import { ChevronDown, Filter } from "lucide-react";

interface BlogContentProps {
  initialNews: NewsItem[];
}

export function BlogContent({ initialNews }: BlogContentProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [displayCount, setDisplayCount] = useState(9);

  const categories = [
    { id: "all", label: t.blog.filters.all },
    { id: "football", label: t.blog.categories.football },
    { id: "pavilion", label: t.blog.categories.pavilion },
    { id: "beach", label: t.blog.categories.beach },
    { id: "action", label: t.blog.categories.action },
    { id: "others", label: t.blog.categories.others },
  ];

  const filteredNews = useMemo(() => {
    if (activeCategory === "all") return initialNews;
    return initialNews.filter((item) => item.category === activeCategory);
  }, [activeCategory, initialNews]);

  const highlights = useMemo(() => filteredNews.slice(0, 3), [filteredNews]);
  const feedNews = useMemo(() => filteredNews.slice(3, displayCount + 3), [filteredNews, displayCount]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 9);
  };

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-col gap-6 pb-8 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          <Filter size={18} className="text-[#FF8C00] hidden md:block mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setDisplayCount(9);
              }}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#FF8C00] text-black shadow-[0_0_20px_rgba(255,140,0,0.3)]"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
           {t.blog.aggregated}
        </p>
      </div>

      {/* Hero Highlights */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + "-hero"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <NewsHero highlights={highlights} />
        </motion.div>
      </AnimatePresence>

      {/* Main Grid Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {feedNews.map((item, idx) => (
            <NewsCard key={item.id} item={item} index={idx} />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {filteredNews.length > feedNews.length + 3 && (
        <div className="flex justify-center pt-12 pb-24">
          <button
            onClick={handleLoadMore}
            className="group flex items-center gap-3 px-12 py-5 bg-[#0a0a0a] border border-white/5 rounded-full text-white font-black uppercase tracking-[0.3em] text-xs hover:border-[#FF8C00]/50 hover:bg-[#FF8C00]/5 transition-all duration-500"
          >
            {t.blog.viewMore}
            <ChevronDown size={18} className="text-[#FF8C00] transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      )}

      {filteredNews.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-white/20 text-xl font-light italic">
            {t.blog.noNews}
          </p>
        </div>
      )}
    </div>
  );
}
