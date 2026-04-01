"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, ProjectCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const CATEGORIES: ("All" | ProjectCategory)[] = ["All", "Football", "Motorsport", "Athletics", "Portraits"];

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section className="min-h-screen py-32 px-6 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 font-sans text-zinc-900 dark:text-white">
          Selected Work
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === category 
                  ? "bg-[#FF8C00] text-black border-[#FF8C00]" 
                  : "bg-transparent text-zinc-500 dark:text-white/60 border-zinc-200 dark:border-white/10 hover:border-[#FF8C00] hover:text-[#FF8C00] dark:hover:text-[#FF8C00]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="inline-block w-full break-inside-avoid"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group relative rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 overflow-hidden cursor-pointer block w-full"
                >
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={project.blurDataURL}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Overlay: Always black gradient since the image needs contrast for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-80" />
                  </div>
                  
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-semibold text-[#FF8C00] uppercase tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-1 text-white leading-tight">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="w-full py-20 text-center text-zinc-500 dark:text-white/50">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
