"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, ArrowLeft, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import { useCart } from '@/src/context/CartContext';
import { GalleryEvent, GalleryPhoto } from '@/src/data/gallery';
import { WatermarkedImage } from './WatermarkedImage';
import { FloatingCartBar } from './FloatingCartBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function GalleryPageClient({ event }: { event: GalleryEvent }) {
  const { t } = useLanguage();
  const { addToCart, removeFromCart, isInCart, clearCart } = useCart();
  const router = useRouter();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(`gallery_access_${event.slug}`);
    if (auth === "true") {
      setIsAuthorized(true);
    } else {
      router.push('/');
    }
  }, [event.slug, router]);

  if (!isAuthorized) return null;

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} />
              {t.portfolio.back}
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{event.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                localStorage.removeItem(`gallery_access_${event.slug}`);
                router.push('/');
              }}
              className="px-6 py-2 border border-white/10 rounded-full text-zinc-500 hover:text-white hover:border-white/30 transition-all text-xs font-bold uppercase tracking-widest"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {event.photos.map((photo, idx) => {
            const selected = isInCart(photo.id);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col"
              >
                <div 
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-zoom-in"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <WatermarkedImage 
                    src={photo.url} 
                    alt={`Photo ${photo.id}`} 
                    fill 
                  />
                  
                  {/* Selection Overlay */}
                  <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${selected ? 'bg-[#FF8C00]/10' : 'bg-transparent'}`} />
                  
                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selected ? removeFromCart(photo.id) : addToCart(photo);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        selected 
                          ? 'bg-[#FF8C00] text-black scale-110 shadow-lg' 
                          : 'bg-black/40 text-white hover:bg-white hover:text-black opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {selected ? <Check size={20} strokeWidth={3} /> : <ShoppingBag size={20} />}
                    </button>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">ID: #{photo.id}</span>
                  <span className="text-sm font-black text-[#FF8C00]">€{photo.price.toFixed(2)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Bar */}
      <FloatingCartBar eventName={event.name} />

      {/* Lightbox Enhancement */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col p-6 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <ArrowLeft size={32} />
            </button>

            <div 
              className="relative flex-1 w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
               <WatermarkedImage 
                src={selectedPhoto.url} 
                alt={`Photo ${selectedPhoto.id}`} 
                fill 
                priority
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 md:p-12 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-3xl font-black tracking-tight mb-2">#{selectedPhoto.id}</h3>
                  <p className="text-zinc-400 font-bold">€{selectedPhoto.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => {
                    isInCart(selectedPhoto.id) ? removeFromCart(selectedPhoto.id) : addToCart(selectedPhoto);
                  }}
                  className={`px-8 py-4 rounded-full font-black uppercase tracking-wider transition-all flex items-center gap-3 ${
                    isInCart(selectedPhoto.id)
                      ? 'bg-zinc-800 text-white border border-white/10'
                      : 'bg-[#FF8C00] text-black shadow-lg hover:scale-105'
                  }`}
                >
                  {isInCart(selectedPhoto.id) ? (
                    <>
                      <Check size={20} strokeWidth={3} />
                      {t.gallery.removeFromCart}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      {t.gallery.addToCart}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
