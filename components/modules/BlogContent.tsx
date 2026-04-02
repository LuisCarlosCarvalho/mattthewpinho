"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { RankingsSection } from "./RankingsSection";
import { NewsCard, NewsSkeleton } from "./NewsCard";
import { cn } from "@/lib/utils";
import { Rocket, Shield, Activity, Brain, Users, Search } from "lucide-react";

type Category = "football" | "motorsport" | "bouncing" | "mind";

export function BlogContent() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Category>("football");
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "football", label: t.blog.categories.football, icon: Shield },
    { id: "motorsport", label: t.blog.categories.motorsport, icon: Rocket },
    { id: "bouncing", label: t.blog.categories.bouncing, icon: Activity },
    { id: "mind", label: t.blog.categories.mind, icon: Brain },
  ];

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?category=${activeTab}`);
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch News Error:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [activeTab]);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FF8C00]/10 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF8C00]/30 bg-[#FF8C00]/5 text-[#FF8C00] text-sm font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(255,140,0,0.1)]"
          >
            <Activity size={16} />
            {language === 'PT' ? "Central de Notícias" : language === 'EN' ? "News Hub" : language === 'ES' ? "Centro de Noticias" : "Centre d'actualités"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            {t.blog.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-[#FF8C00] block md:inline" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t.blog.subtitle}
          </motion.p>
        </div>
      </section>

      {/* World Rankings Section */}
      <RankingsSection />

      {/* Main Aggregator Section */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Tabs & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-white/5 pb-8 relative">
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as Category)}
                  className={cn(
                    "relative px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold transition-all duration-300",
                    activeTab === cat.id 
                      ? "text-white bg-[#FF8C00]/10 border border-[#FF8C00]/30 shadow-lg" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <cat.icon size={18} className={activeTab === cat.id ? "text-[#FF8C00]" : ""} />
                  {cat.label}
                  {activeTab === cat.id && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(255,140,0,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-[#FF8C00] transition-colors" size={20} />
              <input
                type="text"
                placeholder={language === 'PT' ? "Pesquisar..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-[#FF8C00]/50 transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <NewsSkeleton />
                  </motion.div>
                ))
              ) : filteredNews.length > 0 ? (
                filteredNews.map((item, i) => (
                  <NewsCard key={`${activeTab}-${i}`} news={item} index={i} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-3xl"
                >
                  <Users className="text-zinc-800 mb-6" size={80} />
                  <p className="text-zinc-500 font-bold text-xl">{t.blog.noNews}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm"
          >
            <p className="text-zinc-500 text-sm italic">
              {t.blog.aggregated}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
