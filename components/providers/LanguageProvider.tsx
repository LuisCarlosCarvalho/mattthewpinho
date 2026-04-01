"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/src/lib/languages";

export type { Language };

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.PT;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("PT");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved && ["PT", "EN", "ES", "FR"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[language];

  // Sync Metadata and Accessibility attributes
  useEffect(() => {
    if (!mounted) return;
    
    document.title = t.seo.title;
    document.documentElement.lang = language.toLowerCase();
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t.seo.description);
    }
  }, [language, t, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
