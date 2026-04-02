"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, X, Home, Camera, User, Briefcase, 
  Newspaper, Mail
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/src/context/LanguageContext";
import Image from "next/image";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
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

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigationGroup = [
    { id: "home", href: "/", icon: <Home size={22} />, label: t.navbar.home },
    { id: "work", href: "/#portfolio", icon: <Camera size={22} />, label: t.navbar.work },
    { id: "about", href: "/about", icon: <User size={22} />, label: t.navbar.about },
    { id: "services", href: "/services", icon: <Briefcase size={22} />, label: t.navbar.services },
  ];

  const contentGroup = [
    { id: "blog", href: "/blog", icon: <Newspaper size={22} />, label: t.navbar.blog },
    { id: "contact", href: "/contact", icon: <Mail size={22} />, label: t.navbar.contact },
  ];

  const socialLinks = [
    { id: "instagram", href: "https://www.instagram.com/matthewpinhophotos", icon: <InstagramIcon className="w-5 h-5" /> },
    { id: "youtube", href: "https://www.youtube.com/@matthewpinhophotos", icon: <YoutubeIcon className="w-5 h-5" /> },
    { id: "linkedin", href: "https://www.linkedin.com/in/matthewpinho", icon: <LinkedinIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden">
      {/* Floating Action Button */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
        aria-label="Toggle Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          <Plus className="text-black" size={28} />
        </motion.div>
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[75%] max-w-[320px] bg-[#0a0a0a] border-l border-white/5 z-[55] flex flex-col p-8 pt-20"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between mb-12 text-white">
                <div className="relative w-32 h-10">
                  <Image
                    src={mounted ? (document.documentElement.classList.contains("dark") ? "https://i.imgur.com/ZmEiX0I.png" : "https://i.imgur.com/eZXZSHb.png") : "https://i.imgur.com/ZmEiX0I.png"}
                    alt="Matthew Pinho"
                    fill
                    className="object-contain object-left scale-[2.1] origin-left"
                  />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-[#FF8C00] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Group */}
              <div className="mb-10">
                <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-2">
                  {t.footer.links}
                </h3>
                <nav className="flex flex-col gap-6">
                  {navigationGroup.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 text-white/90 hover:text-[#FF8C00] transition-colors duration-200"
                    >
                      <span className="p-2 rounded-lg bg-white/5 group-hover:bg-[#FF8C00]/10 transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-lg font-bold tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Content Group */}
              <div className="mb-auto">
                <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-2">
                  {t.navbar.content}
                </h3>
                <nav className="flex flex-col gap-6">
                  {contentGroup.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 text-white/90 hover:text-[#FF8C00] transition-colors duration-200"
                    >
                      <span className="p-2 rounded-lg bg-white/5 group-hover:bg-[#FF8C00]/10 transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-lg font-bold tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer / Socials */}
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF8C00] hover:bg-[#FF8C00]/10 transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <span className="text-[10px] text-white/20 font-bold tracking-widest">
                  © 2026 MP
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSidebar;
