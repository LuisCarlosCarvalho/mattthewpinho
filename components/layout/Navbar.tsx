"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/src/context/LanguageContext";

export function Navbar() {
  const { t, language: currentLanguage, changeLanguage } = useLanguage();
  
  const links = [
    { href: "/", label: t.navbar.work },
    { href: "/about", label: t.navbar.about },
    { href: "/services", label: t.navbar.services },
    { href: "/blog", label: t.navbar.blog },
    { href: "/contact", label: t.navbar.contact }
  ];

  const languages = [
    { code: "PT", flag: "🇵🇹", label: "PT" },
    { code: "EN", flag: "🇺🇸", label: "EN" },
    { code: "ES", flag: "🇪🇸", label: "ES" },
    { code: "FR", flag: "🇫🇷", label: "FR" },
  ] as const;

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSrc, setLogoSrc] = useState("https://i.imgur.com/ZmEiX0I.png");
  const [isDarkState, setIsDarkState] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkState(isDark);
      setLogoSrc(isDark ? "https://i.imgur.com/ZmEiX0I.png" : "https://i.imgur.com/eZXZSHb.png");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted, theme, resolvedTheme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 h-24 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300",
          isScrolled || mobileMenuOpen 
            ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10" 
            : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center group z-50 transition-all duration-300 flex-shrink-0">
          <div className="relative h-8 md:h-10 w-auto min-w-[100px] md:min-w-[150px] transition-all duration-300">
            {mounted && (
              <Image
                src={logoSrc}
                alt="Matthew Pinho Photography"
                fill
                priority
                className={cn(
                  "object-contain object-left transition-all duration-500 origin-left",
                  isDarkState ? "scale-[2.1]" : "scale-100"
                )}
              />
            )}
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-900 dark:text-zinc-300 transition-colors">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[#FF8C00] dark:hover:text-[#FF8C00] cursor-pointer transition-colors block py-2">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="hidden md:flex items-center gap-6">
          {/* Language Selector Desktop */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 hover:border-[#FF8C00] transition-colors bg-white/50 dark:bg-white/5"
            >
              <span className="text-xl leading-none">
                {languages.find(l => l.code === currentLanguage)?.flag}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                {currentLanguage}
              </span>
            </button>
            
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 p-2 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-xl min-w-[140px] z-[60]"
                >
                  <div className="flex flex-col gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors w-full text-left",
                          currentLanguage === lang.code 
                            ? "bg-[#FF8C00]/10 text-[#FF8C00]" 
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                        )}
                      >
                        <span className="text-xl leading-none">{lang.flag}</span>
                        <span>{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-white/10" />
          <ThemeToggle />
        </div>

        {/* Mobile Navbar: Simple and Clean */}
        <div className="flex md:hidden items-center justify-end gap-3 z-50 flex-shrink-0">
          <button 
            onClick={() => {
              const idx = languages.findIndex(l => l.code === currentLanguage);
              const next = languages[(idx + 1) % languages.length];
              changeLanguage(next.code);
            }}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xl flex-shrink-0"
          >
            {languages.find(l => l.code === currentLanguage)?.flag}
          </button>
          
          <div className="flex-shrink-0 scale-90 origin-right">
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>
    </>
  );
}
