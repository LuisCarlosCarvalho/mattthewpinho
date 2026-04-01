"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

type Language = "PT" | "EN" | "ES" | "FR";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "PT", label: "Português", flag: "🇵🇹" },
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
];

export function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language | null>(null);

  useEffect(() => {
    const hasSelected = localStorage.getItem("preferred_language");
    if (!hasSelected) {
      // Small delay for better UX onboarding feel
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (code: Language) => {
    setSelected(code);
    localStorage.setItem("preferred_language", code);
    
    // Close modal after a brief moment to show the selection highlight
    setTimeout(() => {
      setIsOpen(false);
    }, 600);
  };

  if (!isOpen && !selected) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-sm bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF8C00]/20 blur-3xl rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF8C00]/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-[#FF8C00]" />
              </div>
              
              <h2 className="text-2xl font-bold dark:text-white text-zinc-900 mb-2">Select Language</h2>
              <p className="text-sm dark:text-zinc-400 text-zinc-500 mb-8">Choose your preferred language to continue exploring the portfolio.</p>
              
              <div className="flex flex-col gap-3 w-full">
                {languages.map((lang) => {
                  const isSelected = selected === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`relative flex items-center justify-between w-full px-6 py-4 rounded-xl transition-all duration-300 border ${
                        isSelected 
                          ? "bg-[#FF8C00] border-[#FF8C00] shadow-[0_0_20px_rgba(255,140,0,0.3)]" 
                          : "dark:bg-white/5 bg-zinc-50 dark:border-white/5 border-zinc-200 hover:border-[#FF8C00]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">{lang.flag}</span>
                        <span className={`font-semibold ${isSelected ? "text-black" : "dark:text-white text-zinc-900"}`}>
                          {lang.label}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${isSelected ? "text-black/70" : "dark:text-zinc-500 text-zinc-400"}`}>
                        {lang.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
