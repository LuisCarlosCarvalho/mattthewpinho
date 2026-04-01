"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6 4.1 3.6 5.3 3.6 5.8 3.5 8.5 3.3 12 3.3 12 3.3s3.5 0 6.2.2c.5.1 1.7.1 2.7 1.1.8.8 1 2.5 1 2.5s.2 2 .2 4v2c0 2-.2 4-.2 4s-.2 1.7-1 2.5c-1 1-2.3 1-2.9 1.1-3 .3-6 .3-6 .3s-3.5 0-6.2-.2c-.5-.1-1.7-.1-2.7-1.1-.8-.8-1-2.5-1-2.5s-.2-2-.2-4v-2c0-2 .2-4 .2-4z"/>
    <polygon points="9.5 15.5 16 12 9.5 8.5"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
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

  return (
    <footer className="w-full bg-white dark:bg-[#050505] border-t border-zinc-200 dark:border-white/5 py-16 px-6 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Column 1: Logo & Bio */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="relative h-[60px] w-[300px] overflow-hidden transition-all duration-300">
            {mounted && (
              <Image
                src={logoSrc}
                alt="Matthew Pinho Photography"
                fill
                className={cn(
                  "object-contain object-left transition-all duration-500 origin-left",
                  isDarkState ? "scale-[2.1]" : "scale-100"
                )}
              />
            )}
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm transition-colors">
            {t.footer.bio}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-4 md:items-center">
          <h4 className="text-zinc-900 dark:text-white font-semibold uppercase tracking-widest text-sm mb-2 transition-colors">{t.footer.links}</h4>
          <ul className="flex flex-col space-y-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors">
            <li><Link href="/" className="hover:text-[#FF8C00] transition-colors">{t.navbar.work}</Link></li>
            <li><Link href="/services" className="hover:text-[#FF8C00] transition-colors">{t.navbar.services}</Link></li>
            <li><Link href="/about" className="hover:text-[#FF8C00] transition-colors">{t.navbar.about}</Link></li>
            <li><Link href="/contact" className="hover:text-[#FF8C00] transition-colors">{t.navbar.contact}</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div className="flex flex-col space-y-4 md:items-end">
          <h4 className="text-zinc-900 dark:text-white font-semibold uppercase tracking-widest text-sm mb-2 transition-colors">{t.footer.social}</h4>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/matthewpinho" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-600 dark:text-white hover:text-[#FF8C00] dark:hover:text-[#FF8C00] hover:border-[#FF8C00] dark:hover:border-[#FF8C00] transition-all bg-slate-50 dark:bg-white/[0.02]"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61568631787846" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-600 dark:text-white hover:text-[#FF8C00] dark:hover:text-[#FF8C00] hover:border-[#FF8C00] dark:hover:border-[#FF8C00] transition-all bg-slate-50 dark:bg-white/[0.02]"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.youtube.com/@matthewpinhophotos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-600 dark:text-white hover:text-[#FF8C00] dark:hover:text-[#FF8C00] hover:border-[#FF8C00] dark:hover:border-[#FF8C00] transition-all bg-slate-50 dark:bg-white/[0.02]"
            >
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/matthewpinhophotos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-600 dark:text-white hover:text-[#FF8C00] dark:hover:text-[#FF8C00] hover:border-[#FF8C00] dark:hover:border-[#FF8C00] transition-all bg-slate-50 dark:bg-white/[0.02]"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Signature */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 dark:border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs md:text-sm tracking-wide transition-colors">
        <span>© {currentYear} Matthew Pinho. {t.footer.copy}</span>
        <span>
          {t.footer.rights}{" "}
          <a 
            href="#" 
            className="text-zinc-900 dark:text-white font-semibold hover:text-[#FF8C00] dark:hover:text-[#FF8C00] transition-colors whitespace-nowrap"
          >
            Antigravity AI
          </a>
        </span>
      </div>
    </footer>
  );
}
