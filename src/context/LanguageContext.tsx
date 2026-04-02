"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "../lib/translations";

export type { Language };

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: typeof translations.PT;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("PT");
  const [mounted, setMounted] = useState(false);

  // Initial load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved && ["PT", "EN", "ES", "FR"].includes(saved)) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  // Update HTML lang attribute and title
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = language.toLowerCase();
  }, [language, mounted]);

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const t = translations[language];

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
