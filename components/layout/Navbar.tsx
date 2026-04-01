"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "Sobre" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
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

    // Initial check
    checkTheme();

    // Watch for class changes on <html> (for 'time' mode compatibility)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted, theme, resolvedTheme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide navbar if scrolling down and past 150px
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Add background if scrolled past 50px
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
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="flex md:hidden items-center gap-4 z-50">
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
              className="absolute bottom-12 left-8 right-8 flex justify-between items-center border-t border-zinc-200 dark:border-white/10 pt-6"
            >
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Theme</span>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
