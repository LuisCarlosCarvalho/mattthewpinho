"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Navbar() {
  const { t, language: currentLanguage, setLanguage } = useLanguage();
  
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
        <Link href="/" className="flex items-center group z-50 transition-all duration-300">
          <div className="relative h-[60px] w-[260px] md:h-[72px] md:w-[320px] overflow-hidden transition-all duration-300">
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
                          setLanguage(lang.code);
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

        {/* Mobile Menu Toggle button */}
        <div className="flex md:hidden items-center gap-3 z-50">
          <button 
            onClick={() => {
              const idx = languages.findIndex(l => l.code === currentLanguage);
              const next = languages[(idx + 1) % languages.length];
              setLanguage(next.code);
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xl"
          >
            {languages.find(l => l.code === currentLanguage)?.flag}
          </button>
          
          <ThemeToggle />
          <button 
            className="p-2 -mr-2 text-zinc-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-zinc-50 dark:bg-[#050505] flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-zinc-900 dark:text-white hover:text-[#FF8C00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-8 right-8 flex flex-col gap-6 border-t border-zinc-200 dark:border-white/10 pt-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{t.ui.language}</span>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full border transition-all text-xl",
                        currentLanguage === lang.code 
                          ? "border-[#FF8C00] bg-[#FF8C00]/10" 
                          : "border-transparent bg-zinc-100 dark:bg-white/5"
                      )}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{t.ui.theme}</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
