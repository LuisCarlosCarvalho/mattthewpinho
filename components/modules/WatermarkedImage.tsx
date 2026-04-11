"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/src/context/LanguageContext';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export function WatermarkedImage({ src, alt, className, fill, priority }: WatermarkedImageProps) {
  const { t } = useLanguage();

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Watermark Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="grid grid-cols-2 gap-12 rotate-[-25deg] opacity-30 select-none">
          {[...Array(6)].map((_, i) => (
            <span 
              key={i} 
              className="text-white text-[10px] md:text-sm font-black whitespace-nowrap tracking-[0.3em] uppercase"
            >
              {t.gallery.watermark}
            </span >
          ))}
        </div>
      </div>

      {/* Subtle border overlay */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />
    </div>
  );
}
