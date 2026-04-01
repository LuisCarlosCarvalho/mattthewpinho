"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-24 h-10 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />;
  }

  const activeTheme = theme || "time";

  return (
    <div className="relative flex items-center p-1 rounded-full bg-white dark:bg-[#111111] shadow-inner border border-zinc-200 dark:border-white/10">
      {/* Sun / Light Mode */}
      <button
        onClick={() => setTheme("light")}
        className={`relative z-10 p-2 rounded-full transition-colors ${
          activeTheme === "light" ? "text-black" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      {/* Clock / Auto Time Based Mode */}
      <button
        onClick={() => setTheme("time")}
        className={`relative z-10 p-2 rounded-full transition-colors ${
          activeTheme === "time" ? "dark:text-black text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
        aria-label="Auto time-based mode"
      >
        <Clock className="w-4 h-4" />
      </button>

      {/* Moon / Dark Mode */}
      <button
        onClick={() => setTheme("dark")}
        className={`relative z-10 p-2 rounded-full transition-colors ${
          activeTheme === "dark" ? "text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      {/* Active Indicator Slider */}
      <motion.div
        className={`absolute inset-y-1 w-8 rounded-full ${
          activeTheme === "light" ? "bg-amber-400" : activeTheme === "time" ? "bg-[#FF8C00]" : "bg-zinc-800"
        }`}
        initial={false}
        animate={{
          x: activeTheme === "light" ? 4 : activeTheme === "time" ? 36 : 68,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
