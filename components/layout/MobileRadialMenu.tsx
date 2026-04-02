"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Camera, Mail, Plus, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function MobileRadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { id: "home", href: "/", icon: Home, label: t.navbar.work },
    { id: "services", href: "/services", icon: Briefcase, label: t.navbar.services },
    { id: "portfolio", href: "/#portfolio", icon: Camera, label: t.navbar.work }, // Link to portfolio section
    { id: "contact", href: "/contact", icon: Mail, label: t.navbar.contact },
  ];

  // Radial positions (bottom-right corner, expanding towards top-left)
  // Distance from center: 90px
  // Angles: 270 (up), 240, 210, 180 (left)
  const getCoordinates = (index: number) => {
    const angle = 270 - index * 30; // 270, 240, 210, 180
    const radius = 95;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:hidden">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
          />
        )}
      </AnimatePresence>

      {/* Radial Items */}
      <div className="relative">
        <AnimatePresence>
          {isOpen &&
            menuItems.map((item, i) => {
              const { x, y } = getCoordinates(i);
              return (
                <motion.div
                  key={item.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: i * 0.05,
                  }}
                  className="absolute"
                  style={{ top: 0, left: 0 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] border border-white/10 text-white shadow-2xl hover:border-[#FF8C00] transition-colors group"
                  >
                    <item.icon size={20} className="group-hover:text-[#FF8C00] transition-colors" />
                    
                    {/* Tooltip/Label */}
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-14 px-3 py-1 bg-[#111111] border border-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap pointer-events-none"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)] transition-all duration-300",
            isOpen ? "bg-white text-black rotate-45" : "bg-[#FF8C00] text-black"
          )}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} className={cn("transition-transform", isOpen && "rotate-45")} />}
        </motion.button>
      </div>
    </div>
  );
}
